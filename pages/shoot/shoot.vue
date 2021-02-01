<template>
	<view class="shoot" v-if="Object.keys(sceneryInfo).length">
		<navbar showBack :immersive="immersive">
			<view slot="center">
				<text>{{sceneryInfo.name}}</text>
			</view>
		</navbar>
		<view class="cover">
			<view class="bkg" :style="{backgroundImage:`url(${sceneryInfo.coverUrl})`}"></view>
			<view :class="isStartTrip?'mask-full':'mask'"></view>
			<!-- 未开启视频之旅显示的文字 -->
			<view class="text" v-if="!isStartTrip">
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
			<view class="special" v-if="isStartTrip">
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
				<text>自动录像点</text>
				<view class="go-map" @click="goMap">
					<text>查看地图</text>
					<image src="../../static/arrow.png" mode=""></image>
				</view>
			</view>

			<!-- 自动录像点 -->
			<view class="poi">
				<view class="box" v-for="(item,index) in testData" :key="index">
					<image :src="item.img"></image>
					<view class="desc">
						<view class="top">
							<text>{{item.name}}</text>
							<text>0m</text>
						</view>
						<view class="bottom">
							<text>{{item.desc}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="bottom-bar">
			<view :class="isStartTrip?'btn-start':'btn'" @click="start">
				<text>{{isStartTrip?'去首页浏览其他精彩VLOG':'开启视频之旅'}}</text>
			</view>
		</view>
		
		<tips @touchmove.stop.prevent="moveHandle" :show="showVideo" @close="showVideo=false" />

	</view>
</template>

<script>
	import navbar from '../../components/nav.vue'
	import tips from './components/tips.vue'
	import {
		querySceneryInfo,
		startTrip,
		isStartTrip
	} from '../../api/shoot.js'
	export default {
		data() {
			return {
				sceneryInfo: {},
				isStartTrip: false,
				latitude: "",
				longitude: "",
				immersive: true,
				showVideo:false, //是否展示攻略视频
				startNow: "", //是否立即开启视频之旅
				testData: [{
						img: "https://img1.qunarzz.com/travel/d5/1801/d0/6a8fbbdf116efcb5.jpg_r_720x480x95_bef77a31.jpg",
						name: "敬请期待",
						desc: "打卡点未开放，敬请期待"

					},
					{
						img: "https://youimg1.c-ctrip.com/target/100ghk133vsycxbk0D1D9.jpg",
						name: "敬请期待",
						desc: "打卡点未开放，敬请期待"
					},
					{
						img: "https://youimg1.c-ctrip.com/target//100h16000000yzfy6C1F2.jpg",
						name: "敬请期待",
						desc: "打卡点未开放，敬请期待"
					}
				]
			}
		},
		onLoad(options) {
			// 指示回到本页面是否立即开启视频之旅
			this.startNow = options.start
			// 查询该页面数据
			this.getPageInfo(options.id || getApp().globalData.sceneryId)

		},
		methods: {
			async getPageInfo(id) {
				uni.showLoading({
					title: '加载中'
				})
				// 如果登录 则请求是否开启视频之旅信息
				if (uni.getStorageSync('access_token')) {
					const res = await isStartTrip({
						sceneryId: id
					})
					this.isStartTrip = res.value
				}
				// 请求景区信息
				const res = await querySceneryInfo({
					id
				})
				this.sceneryInfo = res.value

				// 存在该参数时初始化后立刻开启视频之旅
				if (this.startNow) {
					// 防止循环开启
					this.start()
				} else {
					uni.hideLoading()
				}


			},

			// 开启视频之旅
			async start() {
				// 如果已开启视频之旅 点击该按钮跳转回首页
				if (this.isStartTrip && !this.startNow) {
					return uni.switchTab({
						url: '/pages/home/home'
					})
				}
				
				// 如果未登录
				if (!uni.getStorageSync('access_token')){
					getApp().globalData.returnPath = `/pages/shoot/shoot?id=${this.sceneryInfo.id}&start=1`
					return uni.redirectTo({
						url: '/pages/login/login?action=shoot'
					})
				}
				// 防止频繁开启
				this.startNow = ''
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
							uni.showModal({
								content: '视频之旅开启成功，快去景区游玩吧',
								showCancel: false,
								success: _ => {
									this.getPageInfo(this.sceneryInfo.id)
								}
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
				if (err.resultCode === '0012') {
					uni.showModal({
						content: '一小时内只能同时开启两个视频之旅哟~',
						showCancel: false
					})
				} else if (err.resultCode === '0011') {
					// 未采集人脸
					getApp().globalData.returnPath = `/pages/shoot/shoot?id=${this.sceneryInfo.id}&start=1`
					uni.redirectTo({
						url: '/pages/face/face'
					})
				} else if (err.resultCode === '0014') {
					uni.showModal({
						content: '该景区未开启视频服务，请重新选择',
						showCancel: false,
						success: _ => uni.switchTab({
							url: '/pages/home/home'
						})

					})
				} else if (err.resultCode === "0013") {
					// 用户指定景区视频之旅已提交
					uni.showModal({
						showCancel: false,
						content: "您已开启了该景区视频之旅，请勿重复开启",
						success: _ => this.getSceneryInfo(this.sceneryInfo.id)
					})
				}
			},
			
			// 观看攻略视频
			watchTipsVideo(){
				this.showVideo = true
			},
			
			// 防止滑动穿透
			moveHandle(){
				return
			},
			
			// 地图页面
			goMap(){
				uni.navigateTo({
					url:'/pages/map/map'
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
		components: {
			navbar,
			tips
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
				background: #FBC32A;
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
