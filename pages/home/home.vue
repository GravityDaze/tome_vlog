<template>
	<view class="home">
		<!-- 导航条 -->
		<navbar :immersive="immersive">
			<view class="search" slot="left" :style="{background:immersive?'rgba(240, 240, 240, 0.48)':'#F0F0F0'}">
				<view class="search-inner" @click="queryScenery">
					<icon color="#0E0E0E" type="search" size="32rpx" />
					<text>搜索景区 马上打卡</text>
				</view>
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
		<!-- 精选景区 -->
		<hotScenery :hotSceneryData="hotSceneryList" />
		<!-- 精彩瞬间瀑布流 -->
		<moment ref="moment" @loadFinish="done = true" />
		<!-- 瀑布流加载提示 -->
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
		queryHotScenery,
		queryCurrentScenery,
		queryCard
	} from '../../api/home.js'
	// 公用导航组件
	import navbar from '../../components/nav.vue'
	// 页面内组件
	import menubar from './components/menubar.vue'
	import hotScenery from './components/hotScenery.vue'
	import moment from './components/moment.vue'
	export default {
		data() {
			return {
				bannerList: [],
				hotSceneryList: [],
				immersive: true, //导航条是否处于沉浸式状态
				done: false // 瀑布流数据加载是否完毕
			}
		},
		onLoad() {
			// 获取banner数据
			this.getBannerList()
		},
		onShow() {
			// 自定义tabBar mixin 详见https://developers.weixin.qq.com/community/develop/article/doc/0000047ece8448712589b28525b413
			this.setTabBarIndex(0)
			// 获取用户定位
			this.getLocation()
		},
		methods: {
			async getLocation() {
				const [err, res] = await uni.getLocation({
					type: 'gcj02'
				})
				if (err) {
					// 定位获取失败时,精选景区会默认以麦田中心的经纬度为基准
					const {
						lon,
						lat
					} = getApp().globalData
					this.getHotSceneryList(lon,lat)
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
									const [err, res] = await uni.openSetting()
									res.authSetting['scope.userLocation'] && this.getLocation()
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
			async getHotSceneryList(lon,lat) {
				const res = await queryCard({
					lon,
					lat
				})
				// 过滤出景区( 条件为热门景区 + 开启了视频之旅 + 已定位的景区 ) 满足一个条件即可
				const filterScenery = res.value.filter(v => {
					return v.hotStatus === 1 || v.isOpen === 1 || v.isLocation === 1
				})
				// 应该插入的索引
				let insert = 1
				/*
					按优先级排序
					1:定位景区
					2:开启视频之旅的景区
					3.热门景区
				*/
				for (let i = 0; i < filterScenery.length; i++) {
					if (filterScenery[i].isOpen === 1 && i !== 0) {
						let temp = filterScenery.splice(i, 1)
						if (filterScenery[0].isLocation === 1) {
							filterScenery.splice(insert++, 0, ...temp)
						} else {
							filterScenery.splice(insert++ - 1, 0, ...temp)
						}
					}
				}
				this.hotSceneryList = filterScenery

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
					// 如果定位到景区 ,则更新sceneryId
					if (res.value.id) {
						// 更新全局的sceneryId
						getApp().globalData.sceneryId = res.value.id
						this.getHotSceneryList(lon,lat)
					}else{
						// 未定位到景区时,如果用户在景区列表页面已经手动定位 使用手动定位
						const manualLon = getApp().globalData.manualLocation.lon
						const manualLat = getApp().globalData.manualLocation.lat
						if(manualLon && manualLat){
							this.getHotSceneryList(manualLon,manualLat)
						}else{
							this.getHotSceneryList(lon,lat)
						}
					}
					
					
				} catch (err) {
					console.log(err)
				}
			},

			// 点击搜索框跳转到景区列表页面
			queryScenery() {
				uni.navigateTo({
					url: '/pages/sceneryList/sceneryList'
				})
			},

			// 点击banner跳转到视频详情
			navigate(item) {
				uni.navigateTo({
					url: `/pages/video/video?videoShareId=${item.videoShareId}&type=0`
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
			hotScenery,
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
		padding-bottom: 150rpx;
	}

	.search {

		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 26rpx;
		height: 100%;
		width: 336rpx;
		background: rgba(240, 240, 240, 0.48);
		box-shadow: 0px 8rpx 16rpx 0px rgba(49, 49, 48, 0.1);
		border-radius: 32rpx;

		.search-inner {
			display: flex;
			align-items: center;
		}

		text {
			font-size: 28rpx;
			font-weight: 500;
			color: #0E0E0E;
			margin-left: 15rpx;
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
