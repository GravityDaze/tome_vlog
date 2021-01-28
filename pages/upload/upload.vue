<template>
	<view class="upload">
		<view class="top-box">
			<!-- 背景图片 -->
			<image src="../../static/yellow1.png"></image>
			<!-- 文字信息 -->
			<view class="text-box">
				<view class="top-area">
					<view class="location">
						<text>{{sceneryName}}</text>
					</view>
					<text>视频之旅已开启</text>
				</view>
				<!-- 提示文字 -->
				<view class="tips">
					<text>1.上传对应景区的自拍视频，可与近期行程合成个性游记</text>
					<text>2.上传视频文件请控制在{{initParams.uploadVideoMaxSize}}M以内，建议不超过{{initParams.uploadVideoDuration}}秒</text>
				</view>
			</view>
		</view>
		<scroll-view class="upload-panel" scroll-y>
			<!-- 标题 -->
			<view class="title">
				<text>上传自拍视频</text>
			</view>


			<view class="upload-wrapper">

				<view class="item" v-for="(item,index) in uploadData" :key="index">
					<video :id="index" :src="item.fileUrl" muted object-fit="contain" :show-fullscreen-btn="false"
					 :show-center-play-btn="false"></video>
					<view class="rechoose" @click="rechoose(index)">
						<text>重新选择</text>
					</view>
					<image @click="del(index)" src="../../static/del.png"></image>
				</view>

				<view class="upload-box" @click="addVideo">
					<image src="../../static/add.png"></image>
				</view>

			</view>
		</scroll-view>
		<view class="btn" @click="submit">
			<text>提交</text>
			<!-- <text wx:if="{{isUpload}}">自拍视频已提交</text> -->
		</view>
	</view>
</template>

<script>
	import {
		queryUpload,
		submit,
		get7nToken
	} from '../../api/upload.js'
	export default {
		data() {
			return {
				sceneryName:'',
				initParams: {},
				uploadData: [],
				addList: [],
				delList: []
			}
		},
		onLoad(options) {
			this.initParams = getApp().globalData.initParams
			this.customerNeedId = options.customerNeedId
			this.sceneryName = options.sceneryName
			this.getUpload()
		},
		methods: {
			// 获取用户之前上传的视频
			async getUpload() {
				try {
					const res = await queryUpload({
						customerNeedId: this.customerNeedId
					})
					this.uploadData = res.value
				} catch (err) {
					console.log(err)
				}
			},


			// 添加视频
			async addVideo(index) {

				if (this.uploadData.length > this.initParams.uploadVideoMaxNum) {
					return uni.showModal({
						showCancel: false,
						content: "视频已到最大可添加数量，无法添加",
					})
				}
				const [err, res] = await uni.chooseVideo({
					sourceType: ['album', 'camera'], // 视频选择的来源
					maxDuration: this.initParams.uploadVideoDuration, // 拍摄视频最长拍摄时间，单位秒
					compressed: false, // 是否压缩所选择的视频文件
				})

				// 如果用户取消上传或者添加视频失败
				if (err) return

				// 如果上传视频超过大小限制
				if (res.size > this.initParams.uploadVideoMaxSize * 1024 * 1024) {
					return uni.showModal({
						showCancel: false,
						content: "视频超出限制，请控制在" + this.initParams.uploadVideoMaxSize + "M以内",
					})
				}

				// 开始上传
				this.upload(res, index)
			},


			// 上传
			async upload(res, index) {
				uni.showLoading({
					title: '上传中',
					mask: true
				})
				// 获取七牛云token
				const tokenRes = await get7nToken()
				const {
					token
				} = tokenRes.value

				// 上传到七牛云
				try {
					const uploadInfo = await this.uploadToqiniu(res, token)
					const {
						key
					} = JSON.parse(uploadInfo.data)

					const videoItem = {
						fileName: key,
						fileUrl: key,
						filePath: res.tempFilePath
					}
					// 如果参数中存在index 则替换该视频
					if (typeof index === 'number') {
						// 替换uploadData中的视频
						const origin = this.uploadData.splice(index, 1, { ...videoItem,
							fileUrl: res.tempFilePath
						})[0]
						origin.id && this.delList.push(origin.id)
						// 替换掉addList中的视频
						const i = this.addList.findIndex(v => v.fileName === origin.fileName)
						this.addList.splice(i, 1, videoItem)

					} else {
						this.uploadData.push({ ...videoItem,
							fileUrl: res.tempFilePath
						})
						this.addList.push(videoItem)
					}
					uni.showToast({
						title: "上传成功",
						icon: "none"
					})

				} catch (err) {
					console.log(err)
					uni.hideLoading()
				}
			},


			// 上传到七牛云
			uploadToqiniu(res, token) {
				return new Promise((reslove, reject) => {
					// 上传文件
					uni.uploadFile({
						filePath: res.tempFilePath,
						name: 'file',
						url: 'https://up-z2.qiniup.com',
						formData: {
							token
						},
						success: res => reslove(res),
						fail: err => reject(err)
					})
				})

			},

			// 删除视频
			del(index) {
				// 删除掉uploadData中的数据
				const origin = this.uploadData.splice(index, 1)[0]
				console.log(this.uploadData)
				
				if (origin.id) {
					// 如果删除的数据存在id 说明是后台返回的 加入到delList中
					this.delList.push(origin.id)
				} else {
					// 否则是用户当前添加的视频 删除掉addList中的数据
					const i = this.addList.findIndex(v => v.fileName === origin.fileName)
					this.addList.splice(i, 1)
				}

			},

			// 重新选择视频
			rechoose(index) {
				this.addVideo(index)
			},

			// 提交上传
			async submit() {
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				try {
					const res = await submit({
						customerNeedId: this.customerNeedId,
						delList: this.delList,
						addList: this.addList
					})
					uni.hideLoading()
					uni.showModal({
						content: '提交成功',
						showCancel: false,
						success: _ => uni.navigateBack()
					})
				} catch (err) {
					console.log(err)
					uni.hideloading()
				}


			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 顶部盒子 */
	.top-box {
		position: fixed;
		height: 435rpx;
		top: 0;
		width: 100%;
		color: #fff;

		image {
			width: 100%;
			height: 100%;
		}


		.text-box {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;

			.top-area {
				height: 100rpx;
				display: flex;
				flex-flow: column;
				justify-content: space-between;
				align-items: center;
				margin: 50rpx 0;

				.location {
					display: flex;
					justify-content: center;
					font-size: 40rpx;
					align-items: center;
					font-weight: bold;
					position: relative;

					&+text {
						display: flex;
						justify-content: center;
						font-size: 34rpx;
					}
				}
			}

			.tips {
				display: flex;
				flex-flow: column;
				padding-left: 63rpx;
				height: 74rpx;
				justify-content: space-between;
				font-size: 26rpx;
			}
		}
	}

	/* 上传面板 */
	.upload-panel {
		position: absolute;
		border-radius: 30rpx;
		background-color: white;
		width: 700rpx;
		top: 300rpx;
		bottom: 130rpx;
		left: 0;
		right: 0;
		margin: auto;
		box-shadow: 10rpx 0 50rpx rgba(0, 0, 0, 0.2);

		.title {
			margin-top: 50rpx;
			margin-left: 30rpx;
			font-size: 36rpx;
			font-weight: 700;
		}

		.upload-wrapper {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 40rpx;
			padding: 50rpx 30rpx;

			.item {
				position: relative;
				display: flex;
				flex-flow: column;
				align-items: center;




				video {
					height: 168rpx;
					width: 299rpx;
				}


				.rechoose {
					background-color: rgba(255, 89, 62, 1);
					border-radius: 25rpx;
					width: 196rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					box-shadow: 0px 8rpx 16rpx 0px rgba(242, 82, 80, 0.3);
					font-size: 26rpx;
					margin-top: 20rpx;
				}

				image {
					position: absolute;
					top: -15rpx;
					right: -15rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}



			.upload-box {
				background-color: rgba(0, 0, 0, 0.1);
				width: 299rpx;
				height: 168rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 43rpx;
					height: 43rpx;
				}
			}

		}

	}


	/* 提交按钮 */
	.btn {
		position: fixed;
		bottom: 21rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 638rpx;
		border-radius: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 88rpx;
		z-index: 500;
		background: #FFCB3E;
		box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
	}
</style>
