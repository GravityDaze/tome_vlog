<!-- '我的'视频详情页面 -->
<template>
	<view v-if="Object.keys(videoInfo).length">
		<video @timeupdate="timeupdate" @ended="ended" id="video" style="width:100%" autoplay :controls="controls"
			:src="videoInfo.url" @fullscreenchange="e => fullScreen = e.detail.fullScreen"
			:objectFit="fullScreen?'contain':'cover'">
			<cover-view class="tips" v-if="videoInfo.buyStatus === 0 && availableTime !== 0">
				<cover-view>{{ controls? `试看${availableTime}秒`:'试看结束'}}，查看完整版请</cover-view>
				<cover-view style="color: rgba(252, 69, 65, 1);margin-left:15rpx" @click="buy">立即购买</cover-view>
			</cover-view>
		</video>
		<!-- 视频详细信息面板 -->
		<view class="details">
			<view class="top-info">
				<view class="title">
					<text>{{videoInfo.sceneryName + '-视频之旅'}}</text>
				</view>
				<view class="location">
					<text>{{videoInfo.sceneryName}}</text>
				</view>
			</view>
			<view class="bottom-info">
				<view class="time" v-if="videoInfo.buyStatus === 1">
					<text>{{videoInfo.createDatetime}}</text>
				</view>
				<view class="price" v-else>
					<text>购买价格:</text>
					<text>￥{{videoInfo.price}}</text>
				</view>
			</view>
		</view>
		<view class="bottom-bar" v-if="!shareMode">
			<!-- 已购视频 -->
			<view class="bought " v-if="videoInfo.buyStatus === 1">
				<view class="cancel-share" v-if="videoInfo.shareStatus" @click="cancelShare">
					<text>取消发布</text>
				</view>
				<view class="btn-group">
					<view class="share" @click="shareModalVisual = true">
						<text>我要分享</text>
					</view>
					<view class="download" @click="download">
						<text>我要下载</text>
					</view>
				</view>
			</view>

			<!-- 未购视频 -->
			<view class="buy" v-else>
				<view @click="buyTips">
					<image src="../../static/download_no.png"></image>
					<text>下载</text>
				</view>
				<view @click="buyTips">
					<image src="../../static/share_no.png"></image>
					<text>分享</text>
				</view>
				<view class="buy-btn" @click="buy">
					<text>立即购买</text>
				</view>
			</view>

		</view>

		<view class="btn" @click="shoot" v-else>
			<text>我也要拍</text>
		</view>

		<!-- 下载弹框 -->
		<download :show="showDownloadModal" :progress="progress" :videoInfo="videoInfo" @close="closeDownloadModal" />

		<!-- 分享选择组件 -->
		<share :shareModalVisual="shareModalVisual" @close="shareModalVisual = false"
			@publish-success="changeShareStatus" ref="shareModal" :videoInfo="videoInfo" />

	</view>
</template>

<script>
	// 解密视频url
	import {
		JSEncrypt
	} from '../../libs/jsencrypt/index.js';
	// API
	import {
		queryVideoInfo,
		cancelShare,
		confirmOrder,
		buy
	} from '../../api/video.js'
	import share from './componets/share.vue'
	import download from './componets/download.vue'
	export default {
		data() {
			return {
				shareMode: false, //从分享框进入本页面
				videoInfo: {},
				controls: true,
				availableTime: 0,
				shareModalVisual: false,
				showDownloadModal: false,
				progress:0,
				fullScreen: false //是否全屏
			}
		},
		onLoad(options) {
			this.shareMode = options.type === 'share'
			this.getVideoInfo(options.videoId)
		},
		methods: {
			// 获取分享视频
			async getVideoInfo(videoId) {

				const res = await queryVideoInfo({
					videoId
				})
				this.videoInfo = this.decryptVideoUrl(res)
			},

			// 解密视频url
			decryptVideoUrl(res) {
				const encryptByRsa = (text, privateKey) => {
					const encrypt = new JSEncrypt();
					encrypt.setPrivateKey(privateKey);
					return encrypt.decrypt(text);
				}
				res.value.url = encryptByRsa(res.value.url, getApp().globalData.encryptKey)
				return res.value
			},

			// 视频播放回调
			timeupdate(e) {
				if (!this.videoInfo.buyStatus) {
					const {
						currentTime,
						duration
					} = e.detail
					// 指定未购买的视频能播放多少秒
					const {
						noBuyVideoLook
					} = getApp().globalData.initParams
					this.availableTime = Math.ceil(duration * (noBuyVideoLook / 100))
					if (currentTime > this.availableTime) {
						// 试看结束
						this.controls = false
						this.ended()
					}
				}
			},

			// 视频播放结束回调
			ended() {
				const ctx = uni.createVideoContext('video')
				ctx.seek(0)
				ctx.stop()
			},


			// 下载视频
			download() {
				uni.showLoading({
					mask: true
				})
				// 检测用户之前是否拒绝了存储权限
				uni.getSetting({
					success: res => {
						if (res.authSetting['scope.writePhotosAlbum'] === false) {
							uni.hideLoading()
							uni.showModal({
								content: '检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？',
								success: res => res.confirm && uni.openSetting()
							})
						} else {
							// 弹出下载框
							this.showDownloadModal = true
							uni.hideLoading()
							// 执行下载方法
							this.downloadTask = uni.downloadFile({
								url: this.videoInfo.url,
								success: res => {
									if (res.statusCode === 200) {
										this.saveToAlbum(res.tempFilePath)
									} else {
										uni.showToast({
											title: '下载出错',
											icon: 'none'
										})
									}
								}
							})
							// 监听进度
							this.downloadTask.onProgressUpdate((res) => {
								if(res.progress === 100){
									this.showDownloadModal = false
									setTimeout(()=>{
										this.progress = 0
									},500)
								}else{
									this.progress = res.progress
								}
							})
						}
					},
				})
			},
			
			// 关闭下载弹框
			closeDownloadModal(){
				// 强制结束下载任务
				this.downloadTask.abort()
				this.showDownloadModal = false
				setTimeout(()=>{
					this.progress = 0
				},500)
			},

			// 保存视频到相册
			saveToAlbum(filePath) {
				uni.saveVideoToPhotosAlbum({
					filePath,
					success: res => {
						// 保存下载目录
						uni.showToast({
							title: '已保存至相册',
							icon: 'success',
							duration: 2000
						})
					},
					fail: _ => {
						uni.showModal({
							content: '检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？',
							success(res) {
								if (res.confirm) {
									uni.openSetting()
								} else {
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									})
								}
							}
						})
						uni.hideLoading()
					}
				})
			},


			// 关闭模态框
			cancel() {
				this.mask = false
				this.showModal = false
			},

			// 组件改变分享状态
			changeShareStatus(status = 1) {
				// 刷新瀑布流
				uni.$emit("refreshWaterfall")
				// 刷新我的页面已购视频
				const pages = getCurrentPages()
				const prevPage = pages[pages.length - 2]
				if (prevPage.$vm.buyListData.length) {
					prevPage.$vm.getBuyList()
				}
				this.videoInfo.shareStatus = status
			},

			// 取消发布
			cancelShare() {
				uni.showModal({
					content: '是否取消发布',
					success: async res => {
						if (res.confirm) {
							uni.showLoading({
								title: '正在取消',
								mask: true
							})
							try {
								const res = await cancelShare({
									videoId: this.videoInfo.id
								})
								uni.showToast({
									title: '取消成功'
								})
								this.changeShareStatus(0)
							} catch {
								uni.showToast({
									title: '取消失败',
									icon: 'none',
								})
							}
						}
					}
				})
			},

			// 解锁提示
			buyTips() {
				uni.showModal({
					content: '购买视频后开启下载、分享功能 是否立即购买视频？',
					success: res => {
						res.confirm && this.buy()
					}
				})
			},

			// 购买视频
			async buy() {
				uni.showLoading({
					title: '生成订单中',
					mask: true
				})
				const res = await confirmOrder({
					videoId: this.videoInfo.id
				})
				if (res.value.buyStatus === 1) {
					uni.hideLoading()
					uni.showModal({
						content: "请勿重复购买",
						showCancel: false
					})
				} else {
					try {
						const params = await buy({
							videoId: res.value.id,
							price: res.value.videoPrice
						})
						uni.requestPayment({
							...params.value,
							success: res => {
								// 修改本页属性
								this.$set(this.videoInfo, 'buyStatus', 1)
								// 恢复controls
								this.controls = true
								uni.showModal({
									content: '购买成功，快去分享吧~',
									showCancel: false
								})
							}
						})
						uni.hideLoading()
					} catch (err) {
						uni.hideLoading()
						uni.showModal({
							content: err.toString()
						})
					}
				}
			},
			// 开拍按钮
			shoot() {
				// 判断是否定位
				const {
					sceneryId
				} = getApp().globalData
				if (!sceneryId) {
					uni.navigateTo({
						url: '/pages/sceneryList/sceneryList?type=select'
					})
				} else {
					uni.navigateTo({
						url: '/pages/shoot/shoot'
					})
				}
			}
		},
		onShareAppMessage(res) {

			// 来自页面内转发按钮
			let path
			if (!this.videoInfo.shareStatus) {
				path = `/pages/myVideo/myVideo?videoId=${this.videoInfo.id}&type=share`
			} else {
				// 已发布
				path = `/pages/shareVideo/shareVideo?videoShareId=${this.videoInfo.videoShareId}`
			}

			return {
				path,
				title: `这是我在${this.videoInfo.sceneryName}的VLOG，快来看看吧`,
				imageUrl: this.videoInfo.coverUrl
			}
		},
		components: {
			share,
			download
		}
	}
</script>

<style lang="scss" scoped>
	.tips {
		background-color: rgba(0, 0, 0, 0.6);
		padding: 5rpx 15rpx;
		position: absolute;
		left: 100rpx;
		bottom: 80rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 28rpx;
		color: #fff;
	}


	.details {
		padding: 25rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 20rpx solid rgb(247, 247, 247);

		.top-info {
			display: flex;
			justify-content: space-between;
			align-items: center;


			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333332;
			}

			.location {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999896;
			}


		}

		.bottom-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 28rpx;

			.time {

				font-size: 26rpx;
				font-family: San Francisco Display;
				font-weight: 400;
				color: #999996;
			}

			.price {
				display: flex;
				align-items: center;

				&>text:first-child {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999996;
				}

				&>text:last-child {
					font-size: 40rpx;
					font-family: San Francisco Display;
					font-weight: 500;
					color: #FFCB3E;
				}
			}

		}
	}

	.bottom-bar {
		position: fixed;
		width: 100%;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
		height: 97rpx;
		background: #FFFFFF;
		box-shadow: 0px 1rpx 15rpx 3rpx rgba(62, 62, 62, 0.19);

		// 已购视频
		.bought {
			display: flex;
			height: 100%;

			.btn-group {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				height: 100%;
				flex: 1;
				column-gap: 20rpx;

				view {
					flex: 1;
					height: 78rpx;
					border-radius: 39rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-left: 25rpx;

					&:last-child {
						margin: 0 25rpx;
					}
				}

				.share {
					background: #FC4541;
					box-shadow: 0px 8px 16px 0px rgba(225, 66, 66, 0.23);
				}

				.download {
					background: #1DD297;
					box-shadow: 0px 8px 9px 0px rgba(127, 254, 213, 0.35);
				}

			}

			.cancel-share {
				width: 210rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999896;
			}
		}

		.buy {
			padding: 0 20rpx 0 60rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&>view {
				/* border: 1px solid red; */
				display: flex;
				flex-direction: column;
				font-size: 20rpx;
				color: #999;

				image {
					width: 48rpx;
					height: 51rpx;
					margin-bottom: 10rpx;
				}
			}

			.buy-btn {
				border-radius: 40rpx;
				background-color: rgba(250, 200, 60, 1);
				box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
				width: 375rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				color: #333332;
			}
		}

	}

	.mask {
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .18);
		z-index: 98;
	}



	.publishModal {
		background-color: white;
		border-radius: 30rpx 30rpx 0 0;
		width: 100%;
		height: 715rpx;
		z-index: 700;
		position: fixed;
		padding: 174rpx 55rpx 0;
		box-sizing: border-box;
		transition: 0.5s;
	}

	.btn {
		background-color: rgba(250, 200, 60, 1);
		box-shadow: 0rpx 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
		width: 700rpx;
		height: 88rpx;
		border-radius: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 40rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
