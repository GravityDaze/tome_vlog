<!-- 视频详情页面 -->
<template>
	<view>
		<video v-if="videoInfo.url" id="video" style="width:100%" autoplay @fullscreenchange="e => fullScreen = e.detail.fullScreen" :src="videoInfo.url"
		 :objectFit="fullScreen?'contain':'cover'"></video>
		<view v-else class="block"></view>
		<!-- 视频详细信息面板 -->
		<view class="details">
			<view class="top-info">
				<view class="title">
					<text>{{videoInfo.describe}}</text>
				</view>
				<view class="location">
					<text>{{videoInfo.sceneryName}}</text>
				</view>
			</view>
			<view class="bottom-info">
				<view class="user">
					<image :src="videoInfo.headUrl"></image>
					<text>{{videoInfo.shareCustomer}}</text>
				</view>
				<view class="like" @click="like(videoInfo)">
					<image v-if="!videoInfo.laudMe" src="../../static/like.png"></image>
					<image v-else src="../../static/like2.jpg"></image>
					<text>{{videoInfo.laudTimes}}</text>
				</view>
			</view>
		</view>
		<!-- 评论区 -->
		<comment />
		<!-- 我也要拍 -->
		<view class="btn" @click="shoot">
			<text>我也要拍</text>
		</view>
	</view>
</template>

<script>
	// 解密视频url
	import {
		JSEncrypt
	} from '../../libs/jsencrypt/index.js';
	import {
		queryShareVideoInfo
	} from '../../api/video.js'
	import {
		like
	} from '../../api/home.js'
	import comment from './components/comment.vue'
	export default {
		data() {
			return {
				videoInfo: {},
				fullScreen: false //是否全屏
			}
		},
		onShow() {
			// 如果存在videoInfo 则是登录返回
			if (Object.keys(this.videoInfo).length) {
				this.getShareVideoInfo(this.videoInfo.videoShareId)
			}
		},
		onLoad(options) {
			this.getShareVideoInfo(options.scene || options.videoShareId)
		},
		methods: {
			// 解析分享视频
			async getShareVideoInfo(videoShareId) {
				const res = await queryShareVideoInfo({
					videoShareId
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

			fullScreenChange(e) {
				this.fullScreen = e.detail.fullScreen
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
			},

			// 点赞
			async like(item) {
				if (!uni.getStorageSync('access_token')) {
					return uni.navigateTo({
						url: '/pages/login/login'
					})
				}

				if (item.laudMe) {
					uni.showToast({
						title: '您已点赞',
						icon: 'none'
					})
				} else {
					try {
						// 直接修改数据
						item.laudMe = 1
						item.laudTimes++
						await like({
							videoShareId: item.videoShareId
						})
						const pages = getCurrentPages()
						const prevPage = pages[pages.length - 2]
						if (prevPage.route === "pages/home/home") {
							// 通知moment组件更新点赞数据
							prevPage.$vm.$refs.moment.updateLikeData(item.videoShareId)
						}
					} catch (err) {
						uni.showToast({
							title: '点赞失败',
							icon: 'none'
						})
						console.log(err)
						titem.laudMe = 0
						item.laudTimes--
					}

				}
			},
			
			onShareAppMessage() {
				// 来自页面内转发按钮
				return {
					path: `/pages/shareVideo/shareVideo?videoShareId=${ this.videoInfo.videoShareId }`,
					title: this.videoInfo.describe,
					imageUrl:this.videoInfo.coverUrl
				}
			},
			// 分享到朋友圈
			onShareTimeline(){
				return {
					}
			},
		},
		components: {
			comment
		}
	}
</script>

<style lang="scss" scoped>
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

			.user {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: 500;
				color: #999996;

				image {
					width: 48rpx;
					height: 48rpx;
					box-shadow: 0px 0px 12px 0px rgba(62, 62, 62, 0.11);
					border-radius: 50%;
					margin-right: 9rpx;
				}
			}

			.like {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-family: San Francisco Display;
				font-weight: 400;
				color: #999896;

				image {
					width: 30rpx;
					height: 28rpx;
					margin-right: 9rpx;
				}
			}

		}
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

	.block {
		background: #000;
		height: 225px;
	}
</style>
