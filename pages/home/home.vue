<template>
	<view class="home">
		<skeleton v-if="loading" />
		<view v-else>
			<!-- 导航条 -->
			<navbar :scrollTop="scrollTop" threshold="100">
				<view class="location" slot="left">
					<view class="inner" @click="queryScenery">
						<image src="../../static/location.png" mode=""></image>
						<text>{{ sceneryName }}</text>
						<image src="../../static/sj.png" mode=""></image>
					</view>
				</view>
				<view slot="center">
					<text>首页</text>
				</view>
			</navbar>
			<!-- banner -->
			<view class="banner">
				<swiper interval="10000" class="swiper" :indicator-dots="false" :autoplay="true" circular>
					<swiper-item v-for="(item,index) in bannerList" :key="index" @click="navigate(item)">
						<image class="play-icon" src="../../static/play.png"></image>
						<view class="swiper-item">
							<image :src="item.coverUrl"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 周边景区 -->
			<nearby :list="nearbyList" />
			<!-- 推广 -->
			<promote />
			<!-- 精彩瞬间瀑布流 -->
			<moment ref="moment" @loadFinish="done = true" />
			<!-- 瀑布流下方加载提示 -->
			<uni-load-more :status="done?'noMore':'loading'" />
		</view>
	</view>
</template>

<script>
	// api
	import {
		queryBannerList,
		queryCurrentScenery,
		queryCard
	} from '../../api/home.js'
	// 公用导航组件
	import navbar from '../../components/nav.vue'
	// 页面内组件
	// import menubar from './components/menubar.vue' 菜单组件目前无跳转路径 暂时隐藏
	import nearby from './components/nearby.vue'
	import moment from './components/moment.vue'
	import promote from './components/promote.vue'
	// 骨架屏
	import skeleton from '../../skeleton/home.vue'
	export default {
		data() {
			return {
				loading: true, //提示页面在未获取景区前的加载状态
				bannerList: [],
				nearbyList: [], //周边景区列表
				immersive: true, //导航条是否处于沉浸式状态
				done: false, // 瀑布流数据加载是否完毕
				sceneryName: '',
				scrollTop: 0
			}
		},
		async onLoad() {
			await this.$onLaunched
			// 获取banner数据
			this.getBannerList()
			// 监听是否刷新瀑布流
			uni.$on("refreshWaterfall", _ => {
				this.done = false
				this.$refs.moment.refresh()
			})
		},
		async onShow() {
			await this.$onLaunched
			// 自定义tabBar mixin 详见https://developers.weixin.qq.com/community/develop/article/doc/0000047ece8448712589b28525b413
			this.setTabBarIndex(0)
			// 获取用户定位
			this.getLocation()
			// 获取用户在全局保存的景区名
			this.sceneryName = getApp().globalData.sceneryName
		},
		methods: {
			async getLocation() {
				const [err, res] = await uni.getLocation({
					type: 'gcj02'
				})
				if (err) {
					// 定位获取失败时,周边景区会默认以麦田中心的经纬度为基准
					const {
						lon,
						lat,
						sceneryId
					} = getApp().globalData
					this.getNearbyList(lon, lat)
					// 在定位失败的情况下 且当前不存在其他定位的情况下
					if (!sceneryId) {
						this.sceneryName = '未定位到景区'
						getApp().globalData.sceneryName = '未定位到景区'
					}

					// 检查是否是拒绝授权造成的定位失败
					const [err, res] = await uni.getSetting()
					if (res.authSetting['scope.userLocation'] === false) {
						uni.showModal({
							title: '提示',
							content: '检测到您拒绝了地理位置授权，这将无法为您提供VLOG服务，请打开设置界面手动开启权限。 ',
							success: res => {
								if (res.confirm) {
									uni.openSetting()
								} else {
									uni.showToast({
										title: '授权失败',
										icon: 'none'
									})
								}
							}
						})
					}
					this.loading = false
				} else {
					console.log('授权地理位置成功')
					getApp().globalData.lat = res.latitude
					getApp().globalData.lon = res.longitude
					// 获取当前所属景区
					this.getCurrentScenery()
				}
			},



			// 判断当前所属景区
			async getCurrentScenery() {
				const {
					lon,
					lat
				} = getApp().globalData
				try {
					const res = await queryCurrentScenery({
						lon,
						lat
					})
					const {
						name,
						id
					} = res.value
					// 判断用户当前是否进行了手动定位
					const manualLon = getApp().globalData.manual.lon
					const manualLat = getApp().globalData.manual.lat
					// 如果定位到景区
					if (id) {
						const {
							sceneryName
						} = getApp().globalData
						// 如果用户存在手动定位
						if (manualLon) {
							// 用户已经定位在了新的景区
							if (sceneryName !== name) {
								uni.showModal({
									title: `定位到您在${name}`,
									content: `是否切换至${name}？`,
									confirmText: '切换',
									success: ({
										confirm
									}) => {
										if (confirm) {
											// 清除用户的手动定位
											getApp().globalData.manual = {}
											// 进行自动定位更新周边景区
											this.sceneryName = name
											getApp().globalData.sceneryName = name
											getApp().globalData.sceneryId = id
											this.getNearbyList(lon, lat)
										} else {
											// 按照用户手动定位进行更新
											this.getNearbyList(manualLon, manualLat)
										}
									}
								})
							} else {
								// 用户定位的景区和之前选择的景区一致 按照用户手动定位进行更新
								this.getNearbyList(manualLon, manualLat)
							}

						} else {
							this.sceneryName = name
							getApp().globalData.sceneryName = name
							getApp().globalData.sceneryId = id
							// 进行自动定位更新周边景区
							this.getNearbyList(lon, lat)
						}

					} else {
						// 未定位到景区时,如果用户在景区列表页面已经手动定位 使用手动定位
						if (manualLon) {
							// 以用户手动定位经纬度查询周边景区
							this.getNearbyList(manualLon, manualLat)
						} else {
							this.sceneryName = '未定位到景区'
							getApp().globalData.sceneryName = '未定位到景区'
							getApp().globalData.sceneryId = ''
							// 以当前用户经纬度周边景区
							this.getNearbyList(lon, lat)
						}
					}
					
				} catch (err) {
					console.log(err)
				} finally{
					this.loading = false
				}
			},


			// 根据用当前景区获取到周边景区
			async getNearbyList(lon, lat) {
				const res = await queryCard({
					lon,
					lat
				})

				const sceneryList = res.value
				// 应该插入的索引
				let insert = 0
				for (let i = 0; i < sceneryList.length; i++) {
					if (sceneryList[i].isOpen === 1) {
						const temp = sceneryList.splice(i, 1)
						sceneryList.splice(insert++, 0, ...temp)
					}
				}
				this.nearbyList = sceneryList
			},

			// 获取Banner数据
			async getBannerList() {
				const res = await queryBannerList()
				this.bannerList = res.value
			},

			// 点击定位框跳转到景区列表页面
			queryScenery() {
				uni.navigateTo({
					url: '/pages/sceneryList/sceneryList'
				})
			},

			// 点击banner跳转到视频详情
			navigate(item) {
				uni.navigateTo({
					url: `/pages/shareVideo/shareVideo?videoShareId=${item.videoShareId}`
				})
			},

		},

		// 上拉加载更多数据
		onReachBottom() {
			if (this.done) return
			this.$refs.moment.loadNextPage()
		},
		// 判断当前滚动位置改变导航条颜色
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onShareAppMessage() {
			// 来自页面内转发按钮
			return {
				path: `/pages/index/index`,
				title: `快来跟我一起体验途咪vlog吧`
			}
		},
		// 分享到朋友圈
		onShareTimeline() {
			return {}
		},

		components: {
			navbar,
			// menubar,
			nearby,
			moment,
			promote,
			skeleton
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes rota {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(1turn);
		}
	}

	.home {
		padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
	}

	.location {

		display: flex;
		align-items: center;
		height: 100%;


		.inner {
			display: flex;
			align-items: center;
			background: rgba(51, 51, 51, .48);
			border-radius: 30rpx;
			height: 90%;
			padding: 0 25rpx;

			image:first-of-type {
				width: 21rpx;
				height: 25rpx;
			}

			image:last-of-type {
				width: 13rpx;
				height: 11rpx;
			}

			text {
				font-size: 24rpx;
				font-weight: 500;
				color: #fff;
				margin-left: 15rpx;
				margin: 0 8rpx;
			}
		}


	}

	.banner {
		position: relative;
		height: 450rpx;

		.swiper {
			height: 100%;

			.play-icon {
				position: absolute;
				bottom: 127rpx;
				// top: 50%;
				left: 50%;
				// z-index: 9999;
				transform: translateX(-50%);
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
			}

			.swiper-item {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
