<template>
	<view class="face" v-if="hasRes">
		<!-- 相机 -->
		<view class="camera-box" v-if="!faceUrl || recaptureStatus">
			<view class="camera-wrapper">
				<camera device-position="front" flash="off" class="camera" @error="error">
					<cover-image src="../../static/cabg.png"></cover-image>
				</camera>
			</view>
			<view class="shoot" @click="shoot">
				<text>拍照</text>
			</view>
		</view>
		<!-- 已采集到的头像 -->
		<view class="collected" v-else>
			<view class="face-box">
				<image :src="faceUrl"></image>
			</view>
			<view class="confirm" @click="confirm" v-if="showComfirm">
				<text>确认头像</text>
			</view>
			<view class="recapture" @click="recaptureStatus = true">
				<text>重新采集</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryFace,
		editFace,
		get7nToken
	} from '../../api/face.js'
	export default {
		data() {
			return {
				faceUrl: '', //人脸url
				hasRes: false, // 是否已经完成网络请求 防止camera组件闪烁
				recaptureStatus: false, //是否是重新采集头像的状态
				showComfirm: false //是否显示确认头像按钮
			}
		},
		onLoad(options) {
			this.getFace()
		},
		methods: {
			// 获取用户头像信息
			async getFace() {
				try {
					const res = await queryFace()
					// 已经采集过人脸
					if (res.value.frontFace) {
						this.faceUrl = res.value.frontFace
					}
				} finally {
					this.hasRes = true
				}

			},


			// 摄像机打开失败回调
			async error(e) {
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
					success: (res) => {
						uni.showToast({
							title: '头像采集成功',
						})
						// 更新头像
						this.faceUrl = res.tempImagePath
						// 更新按钮状态
						this.recaptureStatus = false
						this.showComfirm = true
					}
				})
			},

			// 确认头像
			async confirm() {
				uni.showLoading({
					title: '正在上传头像'
				})
				const res = await get7nToken()
				this.upload(res.value.token)
			},

			// 上传头像
			upload(token) {
				uni.uploadFile({
					url: 'https://up-z2.qiniup.com/',
					filePath: this.faceUrl,
					name: 'file',
					formData: {
						token
					},
					success: async res => {
						try {
							const {
								key
							} = JSON.parse(res.data);
							// 保存至服务器
							await editFace({
								frontFace:key
							})
							// 如果存在全局返回路径
							const {
								returnPath
							} = getApp().globalData
							if (returnPath) {
								uni.redirectTo({
									url: returnPath,
									success: _ => {
										getApp().globalData.returnPath = ''
									}
								})
							} else {
								uni.navigateBack()
							}


						} catch (err) {
							console.log(err)
						} finally {
							uni.hideLoading()
						}
					}
				})
			},

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

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.confirm {
				background-color: rgba(255, 203, 62, 1);
				border-radius: 44rpx;
				width: 488rpx;
				height: 88rpx;
				font-size: 30rpx;
				color: black;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 226rpx;
			}

			.recapture {
				font-size: 30rpx;
				margin-top: 55rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(153, 152, 150, 1);
			}

		}

	}
</style>
