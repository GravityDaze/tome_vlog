<!-- 我的页面 -->
<template>
	<view class="mine">
		<navbar ref="navbar" :immersive="immersive">
			<view slot="center">
				<text>个人中心</text>
			</view>
		</navbar>
		<!-- 用户资料 -->
		<view class="user-bg" :style="{paddingTop:`${topHeight}px`}">
			<!-- <image src="http://i1.fuimg.com/733051/d7f65285bdafdcd6.jpg" mode="aspectFill"></image> -->
			<view class="mask"></view>
			<view class="user-container" v-if="isLogin">
				<view class="user-info">
					<view class="user">
						<image @click="goFacePage" :src="userInfo.avatarUrl" class="avatar"></image>
						<text>{{userInfo.nickName}}</text>
					</view>

				</view>
			</view>
			<view class="tabs" v-if="isLogin">
				<view class="item">
					<view :class="['single-item',{ active: current === 0 }]" @click="current = 0">
						<text>我的游记</text>
					</view>
					<view :class="['single-item',{ active: current === 1 }]" @click="current = 1">
						<text>已购视频</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tips" v-if="isLogin">
			<text v-if="current === 0">视频最长保留一周，请及时购买</text>
			<text v-if="current === 1">已购买的视频都在这哟~</text>
		</view>

		<view class="content-box" v-if="isLogin">
			<!-- 我的游记 -->
			<list :dataList="travelList" v-show="current === 0" />
			<!-- 已购视频 -->
			<buyList :dataList="buyListData" v-show="current === 1"></buyList>
		</view>
		<!-- 未登录提示 -->
		<view class="login-tips" v-else>
			<image src="../../static/login-tips.png" mode=""></image>
			<text>您还没有登录途咪哦~</text>
			<view class="btn" @click="toLogin">
				<text>登 录</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 公用导航组件
	import navbar from '../../components/nav.vue'
	// 游记列表组件
	import list from './components/list.vue'
	// 已购视频组件
	import buyList from './components/buyList.vue'
	// 查询游记接口
	import {
		queryTravel,
		queryMsg,
		queryBuyList
	} from '../../api/mine.js'
	export default {
		data() {
			return {
				current: 0,
				topHeight: 0,
				redPoint: false,
				immersive: true, //是否沉浸式导航栏
				isLogin: false, //判断是否登录
				userInfo: {}, //用户信息
				travelList: [], //游记数据
				buyListData: []
			}
		},
		onLoad() {
			// 获取到导航栏高度
			this.getNavHeight()
		},
		onShow() {
			this.setTabBarIndex(2)
			// 判断是否登录
			this.checkLoginStatus()
		},
		watch: {
			async current(val) {
				if (val === 1 && !this.buyListData.length) {
					const res = await queryBuyList()
					this.buyListData = res.value.list
				}
			}
		},

		methods: {
			// 获取到导航栏高度
			getNavHeight() {
				const {
					navbar
				} = this.$refs
				this.topHeight = navbar.statusBarHeight + navbar.navHeight
			},

			// 检查登录状态
			async checkLoginStatus() {
				const token = uni.getStorageSync('access_token')
				const userInfo = uni.getStorageSync('userInfo')
				if (token && userInfo) {
					this.userInfo = userInfo
					this.isLogin = true
					// 获取消息提示
					const msg = await queryMsg()
					this.redPoint = !!msg.value.noReadCount
					// 获取游记数据
					const res = await queryTravel()
					this.travelList = res.value.info
				} else {
					this.isLogin = false
				}
			},

			// 跳转至登录界面
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			// 跳转至人脸采集
			goFacePage() {
				if (!this.isLogin) {
					this.toLogin()
				} else {
					uni.navigateTo({
						url: '/pages/face/face'
					})
				}
			},

			// 跳转至已购视频
			aboutUs() {
				uni.navigateTo({
					url: '/pages/about/about'
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
			list,
			buyList
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		padding-bottom: 150rpx;
	}

	.user-bg {
		height: 300rpx;
		position: relative;
		// background:url(http://i2.tiimg.com/733051/b46f91c023c4b145.jpg) no-repeat center center;
		background: url(https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g6/M00/0E/08/ChMkKV9v-8eIHjBqAC7N3ADENtoAAC5uwGEmzYALs30241.jpg) no-repeat center center;
		background-size: cover;
		// background-position:center center;

		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
		}



		.user-container {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 35rpx;

			.user-info {
				display: flex;
				align-items: center;
				width: 100%;

				.user {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 100%;
					width: 100%;
					font-size: 34rpx;
					font-weight: 700;

					image {
						width: 130rpx;
						height: 130rpx;
						margin-bottom: 15rpx;
						border-radius: 50%;
					}
				}





			}
		}

		.tabs {
			position: relative;
			z-index: 1;
			width: 450rpx;
			margin: 35rpx auto 0;

			.item {

				display: flex;
				justify-content: space-around;

				.single-item {
					font-size: 30rpx;
					color: #202020;
				}

				.active {
					position: relative;

					&::after {
						content: '';
						position: absolute;
						bottom: -8rpx;
						left: 50%;
						transform: translateX(-50%);
						width: 85rpx;
						height: 5rpx;
						background: #FFD305;
					}
				}
			}

		}

	}
	
	.tips {
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #B9B9B9;
		text-align: center;
		padding:20rpx 0;
	
	}
	
	.content-box {
		position: relative;
		z-index: 99;
		background: #fff;
		// margin-top: 80rpx;
	}


	.login-tips {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #B9B9B9;
		height: 50vh;

		image {
			width: 300rpx;
			height: 185rpx;
			margin-bottom: 30rpx;
		}

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			width: 265rpx;
			margin-top: 50rpx;
			height: 75rpx;
			background: #FFD305;
			border-radius: 44rpx;
			color: #4D4A45;

			text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;

			}
		}
	}
</style>
