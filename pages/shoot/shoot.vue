<template>
	<view class="shoot" v-if="Object.keys(sceneryInfo).length">
		<navbar showBack :immersive="immersive">
			<view slot="center">
				<text>{{sceneryInfo.name}}</text>
			</view>
		</navbar>
		<view class="cover">
			<view class="bkg" :style="{backgroundImage:`url(${sceneryInfo.coverUrl})`}"></view>
			<view :class="hasStartTrip?'mask-full':'mask'"></view>
			<!-- 未开启视频之旅显示的文字 -->
			<view class="text" v-if="!hasStartTrip">
				<text class="name">{{sceneryInfo.name}}</text>
				<view class="desc">
					<text>{{sceneryInfo.describe}}</text>
				</view>
			</view>
			<!-- 已开启视频之旅显示的文字 -->
			<view class="text-start" v-else>
				<image src="../../static/camera.png"></image>
				<text>{{sceneryInfo.name}}视频之旅已开启</text>
				<text>快去景区留下你的足迹吧</text>
			</view>
		</view>
		<view class="panel">
			<!-- 特别说明 -->
			<view class="special" v-if="hasStartTrip">
				<text>特别说明</text>
				<text>录制开始，可退出小程序，不会停止视频录制，待游玩结束重新进入小程序，去“我的”中查看即可。</text>
			</view>


			<!-- 引导视频 -->
			<template v-else>
				<view class="title1">
					<text>打卡攻略</text>
				</view>
				<view class="guide">
					<text>在开拍前，可观看此视频进行操作指引哟~</text>
					<view class="guide-cover" @click="watchTipsVideo">
						<image class="cover" src="https://tomevideo.zhihuiquanyu.com/20210120142357.jpg"></image>
						<image class="play" src="../../static/play_guide.png" mode=""></image>
					</view>
				</view>
			</template>


			<!-- 文字2 -->
			<view class="title2">
				<text>打卡点</text>
				<view class="go-map" @click="goMap(0)" v-if="pointList.length">
					<text>查看地图</text>
					<image src="../../static/arrow.png" mode=""></image>
				</view>
			</view>

			<!-- 自动录像点 -->
			<view class="poi" v-if="pointList.length">
				<view class="box" v-for="(item,index) in pointList" :key="index" @click="goMap(index)">
					<image :src="item.picUrl"></image>
					<view class="desc">
						<view class="top">
							<text>{{item.name}}</text>
							<!-- <text>??m</text> -->
						</view>
						<view class="bottom">
							<text>{{item.description}}</text>
						</view>
					</view>
				</view>
			</view>

			<view v-else style="text-align: center; font-size:22rpx;padding-top:50rpx;color: #B2B2B2">
				<text>暂无打卡点信息</text>
			</view>

		</view>

		<view class="bottom-bar">
			<view :class="hasStartTrip?'btn-start':'btn'" @click="start">
				<text>{{hasStartTrip?'去首页浏览其他精彩VLOG':'开启视频之旅'}}</text>
			</view>
		</view>
		<!-- 模板选择弹出层 -->
		<uni-popup ref="popup" type="center">
			<tempModal @submit="submit" />
		</uni-popup>
		<videoPlayer src="https://tomevideo.zhihuiquanyu.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%95%E5%AF%BC_0302.mp4" @touchmove.stop.prevent="moveHandle" :show="showVideo" @close="showVideo = false" />
	</view>
</template>

<script>
	import navbar from '../../components/nav.vue'
	import videoPlayer from '../../components/video-player.vue'
	import tempModal from './components/tempModal.vue'
	import {
		querySceneryInfo,
		startTrip,
		hasStartTrip,
		queryPointList
	} from '../../api/shoot.js'
	export default {
		data() {
			return {
				sceneryInfo: {},
				hasStartTrip: false,
				latitude: "",
				longitude: "",
				immersive: true,
				showVideo: false, //是否展示攻略视频
				pointList: []
			}
		},
		onLoad(options) {
			// 查询该页面数据
			this._id = options.id || getApp().globalData.sceneryId
			this.getPageInfo(this._id)
			// 查询打卡点
			this.getPositionPoint(this._id)

		},
		methods: {
			async getPageInfo(id) {
				uni.showLoading({
					title: '加载中'
				})
				if (!uni.getStorageSync('access_token')) {
					const res = await querySceneryInfo({
						id
					})
					this.sceneryInfo = res.value
				} else {
					const [res, res2] = await Promise.all([querySceneryInfo({
						id
					}), hasStartTrip({
						sceneryId: id
					})])
					this.sceneryInfo = res.value
					this.hasStartTrip = res2.value
				}
				uni.hideLoading()
			},

			async getPositionPoint(id) {
				const res = await queryPointList({ sceneryId: id, status: 1 })
				if (res.value.list.length) {
					this.pointList = res.value.list
				}
			},

			// 弹出模板选择框
			start() {
				// 如果已开启视频之旅 点击该按钮跳转回首页
				if (this.hasStartTrip) {
					return uni.switchTab({
						url: '/pages/home/home'
					})
				}

				// 如果未登录
				if (!uni.getStorageSync('access_token')) {
					return uni.navigateTo({
						url: `/pages/login/login?action=shoot`
					})
				}

				// 弹出模板选择框
				this.$refs.popup.open()
			},
			
			async submit(){
				uni.showLoading({
					title: '视频之旅开启中',
					mask: true
				})
				try {
					await startTrip({
						sceneryId: this.sceneryInfo.id
					})
					// 订阅模板消息
					const {
						composeSuccessSubscribeTmplId
					} = getApp().globalData.initParams
					uni.requestSubscribeMessage({
						tmplIds: [composeSuccessSubscribeTmplId],
						complete: _ => {
							this.hasStartTrip = true
							uni.showModal({
								content: '视频之旅开启成功，快去景区游玩吧',
								showCancel: false
							})
						}
					})
				} catch (err) {
					this.handleErr(err)
				} finally {
					uni.hideLoading()
				}
			},

			// 开启视频之旅失败时的错误处理
			handleErr(err) {
				switch (err.resultCode) {
					case '0012':
						uni.showModal({
							content: '一小时内只能同时开启两个视频之旅哟~',
							showCancel: false
						})
						break
					case '0011':
						// 未采集人脸
						uni.navigateTo({
							url: `/pages/face/face?action=shoot`
						})
						break
					case '0014':
						uni.showModal({
							content: '该景区未开启视频服务，请重新选择',
							showCancel: false,
							success: _ => uni.switchTab({
								url: '/pages/home/home'
							})
						})
						break
					case '0013':
						this.hasStartTrip = true
						// 用户指定景区视频之旅已提交
						uni.showModal({
							showCancel: false,
							content: "您已开启了该景区视频之旅，请勿重复开启"
						})
				}

			},

			// 观看攻略视频
			watchTipsVideo() {
				this.showVideo = true
			},

			// 防止滑动穿透
			moveHandle() {
				return
			},

			// 地图页面
			goMap(index) {
				uni.navigateTo({
					url: `/pages/map/map?index=${index}&id=${this._id}`
				})
			}

		},
		onPageScroll(e) {
			if (e.scrollTop > 50) {
				// 防止频繁修改
				if (!this.immersive) return
				this.immersive = false

			} else {
				if (this.immersive) return
				this.immersive = true
			}
		},

		onShareAppMessage() {
			// 来自页面内转发按钮
			return {
				path: `/pages/index/index?sceneryId=${ this.sceneryInfo.id }`,
				title: `快来跟我一起开启${this.sceneryInfo.name}的视频之旅吧`,
				imageUrl: this.sceneryInfo.coverUrl
			}

		},

		components: {
			navbar,
			videoPlayer,
			tempModal
		}
	}
</script>

<style lang="scss" scoped>
	.shoot {

		.cover {
			position: relative;
			height: 430rpx;
			transition: .3s;

			.bkg {
				height: 100%;
				background-color: #f5f5f5;
				background-position: center;
				background-size: cover;

			}


			.mask {
				position: absolute;
				height: 145rpx;
				width: 100%;
				bottom: 0;
				background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));
			}

			.mask-full {
				position: absolute;
				top: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .52);
				width: 100%;
			}

			.text {
				position: absolute;
				bottom: 45rpx;
				left: 30rpx;
				z-index: 10;

				text {
					font-family: PingFang SC;
					font-weight: 500;
					color: #FEFEFE;
				}

				.name {
					font-size: 36rpx;
				}

				.desc {
					margin-top: 5rpx;
					font-size: 24rpx;
				}
			}

			.text-start {
				position: absolute;
				z-index: 10;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-flow: column;
				color: #FEFEFE;

				image {
					width: 95rpx;
					height: 60rpx;
				}

				text:first-of-type {
					font-size: 45rpx;
					font-weight: 800;
					margin-top: 18rpx;
				}

				text:last-of-type {
					font-size: 28rpx;
					font-weight: bold;
					margin-top: 10rpx;
				}

			}
		}

		.panel {
			position: relative;
			z-index: 99;
			background: #fff;
			transform: translateY(-35rpx);
			border-radius: 27rpx 27rpx 0px 0px;
			padding: 30rpx 30rpx 150rpx;

			.special {
				display: flex;
				flex-flow: column;
				color: #999;
				line-height: 1.8;

				text:first-child {
					font-size: 28rpx;
					font-weight: bold;
				}

				text:last-child {
					font-size: 26rpx;
				}
			}

			.guide {
				font-size: 26rpx;
				font-weight: 500;
				color: #B2B2B2;

				.guide-cover {
					position: relative;
					margin-top: 15rpx;

					.cover {
						height: 292rpx;
						width: 100%;
						box-shadow: 0px 8rpx 27rpx 0px rgba(0, 0, 0, 0.06);
						border-radius: 27rpx;

					}

					.play {
						position: absolute;
						top: 35rpx;
						right: 35rpx;
						height: 60rpx;
						width: 60rpx;
					}
				}

			}

			.title1 {
				padding: 10rpx 0rpx 5rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333332;
			}

			.title2 {
				display: flex;
				justify-content: space-between;
				padding: 30rpx 0;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333332;

				.go-map {
					display: flex;
					align-items: center;
					font-size: 22rpx;
					font-weight: 400;
					color: #B5B3B2;

					image {
						padding-left: 8rpx;
						width: 13rpx;
						height: 24rpx;
					}
				}
			}

			.poi {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 28rpx;

				.box {
					image {
						width: 337rpx;
						height: 225rpx;
						border-radius: 18rpx;
					}

					.desc {
						.top {
							display: flex;
							justify-content: space-between;

							text:first-child {
								font-size: 28rpx;
								font-weight: bold;
								color: #333332;
							}

							text:last-child {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #979797;
							}
						}

						.bottom {
							font-size: 24rpx;
							font-weight: 400;
							color: #808080;
							margin-top: 8rpx;
						}
					}
				}

			}

		}

		.bottom-bar {
			position: fixed;
			z-index: 99;
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 0;
			width: 100%;
			height: 137rpx;
			box-shadow: 0 5rpx 19rpx rgba(0, 0, 0, 0.15);
			background: #fff;

			view {
				display: flex;
				align-items: center;
				justify-content: center;
				width: calc(100% - 60rpx);
				height: 88rpx;
				border-radius: 44rpx;
			}

			.btn {
				background-color: #FBC32A;
				box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);

			}


			.btn-start {
				background: #6ADB26;
				box-shadow: 0px 8rpx 16rpx 0px rgba(83, 178, 25, 0.48);
				color: #fff;
			}
		}

	}
</style>
