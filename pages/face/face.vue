<template>
	<view class="face" v-if="hasRes">
		<!-- 相机 -->
		<view class="camera-box" v-if="rec">
			<view class="camera-wrapper">
				<camera device-position="front" flash="off" class="camera" @error="error" @initdone="initdone = true">
					<cover-image src="../../static/cabg.png"></cover-image>
				</camera>
				<view class="mask" v-if="initdone">
					<text>{{count}}</text>
				</view>
			</view>
			<view class="tip">
				<text>请正对屏幕，勿遮挡面部</text>
			</view>
		</view>
		<!-- 已采集到的头像 -->
		<view class="collected" v-else>
			<view class="face-box" :style="{backgroundImage:`url( ${require( err?'../../static/err.png':'../../static/cabg.png'  ) } )`   }">
				<image :src="faceUrl"></image>
			</view>
			<view class="warning" v-if="err">
				<text>没有检测到人脸，请点击下方按钮进行重新采集</text>
			</view>
			<view class="recapture" v-if="showBtn" @click="recapture">
				<text>重新采集</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryFace,
		editFace,
		get7nToken,
		checkFace
	} from '../../api/face.js'
	export default {
		data() {
			return {
				action: '',
				rec: false, //当前正在采集
				err: false, //采集失败
				faceUrl: '', //人脸url
				hasRes: false, // 是否已经完成网络请求 防止camera组件闪烁
				showBtn: false, //是否显示重新采集
				count: 3,
				initdone:false //相机是否初始化完成
			}
		},
		onLoad(options) {
			this.action = options.action
			this.getFace()
		},
		watch: {
			initdone(val) {
				if (val) {
					const timer = setInterval(_ => {
						this.count--
						if (this.count === 0) {
							clearInterval(timer)
							this.showBtn = false
							this.shoot()
						}
					}, 1000)
				}
			}
		},
		methods: {
			// 获取用户头像信息
			async getFace() {
				try {
					const res = await queryFace()
					// 已经采集过人脸
					if (res.value.frontFace) {
						this.faceUrl = res.value.frontFace
						this.showBtn = true
					} else {
						this.rec = true
					}
				} finally {
					this.hasRes = true
				}

			},


			// 摄像机打开失败回调
			async error(e) {
				this.rec = false
				const [err, res] = await uni.getSetting()
				if (!res.authSetting['scope.camera']) {
					wx.showModal({
						title: '调用摄像机失败',
						content: '检测到您拒绝了授权，将无法进行人脸采集，是否去设置打开？',
						success: ({
							confirm
						}) => {
							if (confirm) {
								uni.openSetting({
									complete: _ => {
										// 逻辑待完成
										this.rec = true
									}
								})
							} else {
								uni.navigateBack()
							}
						}
					})
				}
			},

			// 拍照
			shoot() {
				const ctx = uni.createCameraContext()
				ctx.takePhoto({
					quality: 'high',
					success: async (res) => {
						// 结束采集
						this.rec = false
						this.initdone = false
						// 恢复倒计时
						this.count = 3
						this.faceUrl = res.tempImagePath
						uni.showLoading({
							title: '验证人脸中',
							mask: true
						})
						// 上传七牛云
						const result = await this.upload(res.tempImagePath)
						const data = JSON.parse(result.data)
						try {
							// 调用人脸检测接口
							await checkFace({
								url: `https://tomevideo.zhihuiquanyu.com/${data.key}`
							})
							// 上传
							await editFace({
								frontFace: data.key
							})
							uni.hideLoading()
							uni.showModal({
								content: '人脸采集成功',
								showCancel: false,
								success: _ => {
									if (this.action === 'shoot') {
										getApp().globalData.handler = 'start'
									}
									return uni.navigateBack()
								}
							})
						} catch (err) {
							uni.hideLoading()
							this.err = true
							this.showBtn = true
						} 

					}
				})
			},
			
			recapture(){
				this.err = false
				this.rec = true 
			},

			// 上传头像
			async upload(url) {
				// 获取token
				const res = await get7nToken()
				return new Promise((reslove, reject) => {
					// 上传
					uni.uploadFile({
						url: 'https://up-z2.qiniup.com/',
						filePath: url,
						name: 'file',
						formData: {
							token: res.value.token
						},
						success: res => reslove(res)
					})
				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	.face {
		padding-top: 81rpx;

		.camera-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			.camera-wrapper {
				position: relative;

				.camera {
					width: 489rpx;
					height: 489rpx;
				}

				.mask {
					position: absolute;
					top: 0;
					bottom: 0;
					width: 100%;
					background: rgba(0, 0, 0, .31);
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 315rpx;
					color: #fff;
				}

			}

			.tip {

				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999896;
				margin-top: 50rpx;
			}

			.shoot {
				background-color: rgba(255, 203, 62, 1);
				border-radius: 44rpx;
				width: 488rpx;
				height: 88rpx;
				font-size: 30rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 226rpx;
			}

		}

		.collected {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.face-box {
				width: 489rpx;
				height: 489rpx;
				background: url(../../static/cabg.png);
				background-size: cover;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 460rpx;
					height: 460rpx;
					border-radius: 50%;
				}
			}

			.warning{
				font-size: 24rpx;
				font-weight: 500;
				color: #FF0000;
				margin-top:50rpx;
			}

			.recapture {
				background-color: rgba(255, 203, 62, 1);
				border-radius: 44rpx;
				width: 488rpx;
				height: 88rpx;
				font-size: 30rpx;
				color: black;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 153rpx;
			}

		}

	}
</style>
