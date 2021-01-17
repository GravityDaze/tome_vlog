<template>
	<view class="home">
		<!-- 导航条 -->
		<navbar class="navbar" :immersive="immersive" />
		<!-- banner -->
		<view class="banner">
			<swiper interval="10000" class="swiper" :indicator-dots="false" :autoplay="true" circular>
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image class="play-icon" src="../../static/play.png"></image>
					<view class="swiper-item">
						<image :src="item.coverUrl"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 菜单 -->
		<menubar class="menubar" />
		<!-- 热门景区 -->
		<hotScenery :hotSceneryData="hotSceneryList" />
		<!-- 精彩瞬间瀑布流 -->
		<moment ref="moment" @loadFinish="done = true" />
		<!-- 瀑布流加载提示 -->
		<view class="load">
			<image v-if="!done" src="../../static/load.png"></image>
			<view class="empty" v-else>
				<image src="../../static/bad.png"></image>
				<text>没有更多数据了</text>
			</view>
		</view>
		<!-- 对话框 -->
		<scenery-dialog :name="sceneryName" :show="showDialog" @close="showDialog = false" />
		
	</view>
</template>

<script>
	import {
		queryBannerList,
		queryHotScenery,
		queryCurrentScenery
	} from '../../api/home.js'
	import navbar from './components/navbar.vue'
	import menubar from './components/menubar.vue'
	import hotScenery from './components/hotScenery.vue'
	import moment from './components/moment.vue'
	import sceneryDialog from './components/dialog.vue'
	export default {
		data() {
			return {
				bannerList: [],
				hotSceneryList: [],
				immersive: true, //导航条是否处于沉浸式状态
				done: false ,// 瀑布流数据加载是否完毕
				showDialog:false ,//是否展示对话框
				sceneryName:"",//对话框中的景区名
			}
		},
		onLoad() {
			// 获取用户定位
			this.getLocation()
			// 获取banner数据
			this.getBannerList()
			// 获取热门景区数据，默认会获取到天府广场的坐标
			this.getHotSceneryList()
			// // 获取当前所属景区
			// this.getCurrentScenery()
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
					getApp().globalData.lat = res.latitude
					getApp().globalData.lon = res.longitude
					// 获取到用户地理位置后，重新获取热门景区数据
					this.getHotSceneryList()
					// 获取当前所属景区
					this.getCurrentScenery()
				}
			},

			async getBannerList() {
				const res = await queryBannerList()
				this.bannerList = res.value
			},
			async getHotSceneryList() {
				const {
					lon,
					lat
				} = getApp().globalData
				const res = await queryHotScenery({
					lon,
					lat
				})
				this.hotSceneryList = res.value
			},
			
			// 判断当前所属景区是否弹出对话框
			async getCurrentScenery(){
				const {
					lon,
					lat
				} = getApp().globalData
				try{
					const res = await queryCurrentScenery({
						lon,
						lat,
						sceneryId:''
					})
					if(res.value.flag === 1){
						// 传输景区名给对话框
						this.sceneryName = res.value.name
						this.showDialog = true
					}
					
				}catch(err){
					console.log(err)
				}
				
					
			}
		
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
				if(!this.immersive) return
				this.immersive = false
				uni.setNavigationBarColor({
					frontColor: "#000000",
					backgroundColor:"#000000"
				})
			} else {
				if(this.immersive) return 
				this.immersive = true
				uni.setNavigationBarColor({
					frontColor: "#ffffff",
					backgroundColor:"#000000"
				})
			}
		},


		components: {
			navbar,
			menubar,
			hotScenery,
			moment,
			sceneryDialog
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
		
		.empty{
			display:flex;
			align-items: center;
			color: #bfbfbf;
			font-size: 28rpx;
			padding: 40rpx 0;
			
			image{
				width: 35rpx;
				height:35rpx;
				margin-right:8rpx;
			}
		}

		
	}
</style>
