<template>
	<view class="home">
		<!-- 导航条 -->
		<navbar :immersive="immersive">
			<view class="location" slot="left" v-if="immersive">
				<view class="inner" @click="queryScenery">
					<image src="../../static/location.png" mode=""></image>
					<text>{{ sceneryName || '定位中' }}</text>
					<image src="../../static/sj.png" mode=""></image>
				</view>
			</view>
			<view v-else slot="center">
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
		<!-- 菜单 -->
		<menubar class="menubar" />
		<!-- 周边景区 -->
		<nearby :list="nearbyList" />
		<!-- 精彩瞬间瀑布流 -->
		<moment ref="moment" @loadFinish="done = true" />
		<!-- 瀑布流下方加载提示 -->
		<view class="load">
			<image v-if="!done" src="../../static/load.png"></image>
			<view class="empty" v-else>
				<text>加载完毕</text>
			</view>
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
	import menubar from './components/menubar.vue'
	import nearby from './components/nearby.vue'
	import moment from './components/moment.vue'
	export default {
		data() {
			return {
				bannerList: [],
				nearbyList: [],//周边景区列表
				immersive: true, //导航条是否处于沉浸式状态
				done: false, // 瀑布流数据加载是否完毕
				sceneryName: '',
				repeatModal: true //是否重复弹框
			}
		},
		onLoad() {
			// 获取banner数据
			this.getBannerList()
		},
		onShow() {
			// 自定义tabBar mixin 详见https://developers.weixin.qq.com/community/develop/article/doc/0000047ece8448712589b28525b413
			this.setTabBarIndex(0)
			// 提示moment组件刷新瀑布流
			if( getApp().globalData.refreshWaterFall ){
				getApp().globalData.refreshWaterFall = false
				this.done = false
				this.$refs.moment.refresh()
			}
			// 提示moment组件更新用户点赞数据
			if( getApp().globalData.updateLikeId ){
				this.$refs.moment.updateLikeData()
			}
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
						lat
					} = getApp().globalData
					const manualLon = getApp().globalData.manual.lon
					const manualLat = getApp().globalData.manual.lat
					this.getNearbyList(lon, lat)
					// 在定位失败的情况下 如果不存在手动定位 则提示未定位到景区
					if(!manualLon){
						this.sceneryName = '未定位到景区'
						getApp().globalData.sceneryName = '未定位到景区'
					}
					
					// 检查是否是拒绝授权造成的定位失败
					const [err, res] = await uni.getSetting()
					if (res.authSetting['scope.userLocation'] === false) {
						uni.showModal({
							title: '提示',
							content: '检测到您拒绝了地理位置授权，这将无法为您提供VLOG服务，请打开设置界面手动开启权限。 ',
							success: async ({
								confirm
							}) => {
								if (confirm) {
									await uni.openSetting()
								} else {
									uni.showToast({
										title: '授权失败',
										icon: 'none'
									})
								}
							}
						})
					}

				} else {
					console.log('授权地理位置成功')
					getApp().globalData.lat = res.latitude
					getApp().globalData.lon = res.longitude
					// 获取当前所属景区
					this.getCurrentScenery()

				}
			},

			async getBannerList() {
				const res = await queryBannerList()
				this.bannerList = res.value
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
									title:`定位到您在${name}`,
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

			// 点击定位框跳转到景区列表页面
			queryScenery() {
				getApp().globalData.returnPath = "/pages/home/home"
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
			menubar,
			nearby,
			moment
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
		height: 430rpx;

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

	.load {
		display: flex;
		justify-content: center;
		align-items: center;
		


		&>image {
			padding: 20rpx 0;
			width: 45rpx;
			height: 45rpx;
			animation: rota .5s infinite linear;
		}

		.empty {
			display: flex;
			align-items: center;
			color: #bfbfbf;
			font-size: 28rpx;
			padding: 40rpx 0;
		}


	}
</style>
