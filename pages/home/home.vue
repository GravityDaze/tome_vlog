<template>
	<view class="home">
		<!-- 导航条 -->
		<navbar class="navbar" />
		<!-- banner -->
		<view class="banner">
			<swiper interval="10000" class="swiper" :indicator-dots="false" :autoplay="true" circular>
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image class="play-icon" src="../../static/play.png" mode=""></image>
					<view class="swiper-item">
						<image :src="item.coverUrl" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 菜单 -->
		<menubar />
		<!-- 热门景区 -->
		<hotScenery :data="hotSceneryList" />
		<!-- 精彩瞬间 -->
		<moment />

	</view>
</template>

<script>
	import {
		queryBannerList,
		queryHotScenery
	} from '../../api/home.js'
	import navbar from './components/navbar.vue'
	import menubar from './components/menubar.vue'
	import hotScenery from './components/hotScenery.vue'
	import moment from './components/moment.vue'
	export default {
		data() {
			return {
				bannerList: [],
				hotSceneryList:[]
			}
		},
		onLoad() {
			// 获取景区定位
			this.getLocation()
			// 获取banner数据
			this.getBannerList()
			// 获取热门景区数据
			this.getHotSceneryList()
		},
		methods: {
			async getLocation() {
				const [err, res] = await uni.getLocation({
					type: 'gcj02'
				})
				// 检测到用户拒绝了地理位置授权 , 引导用户打开权限设置
				if (err) {
					const [err, res] = await uni.getSetting()
					console.log(res.authSetting['scope.userLocation'])
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
										icon: 'none',
										duration: 1000
									})
								}
							}
						})
					}

				} else {
					console.log('授权地理位置成功')
					getApp().globalData.lon = res.latitude
					getApp().globalData.lat = res.longitude
				}
			},

			async getBannerList() {
				const res = await queryBannerList()
				this.bannerList = res.value
			},
			async getHotSceneryList() {
				const { lon,lat } = getApp().globalData
				const res = await queryHotScenery({
					lon,
					lat
				})
				this.hotSceneryList = res.value
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
</style>
