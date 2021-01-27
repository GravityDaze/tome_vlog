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
			<image src="../../static/minebg.jpg" mode="aspectFill"></image>
			<view class="user-container">
				<view class="user-info">
					<view class="user" v-if="isLogin">
						<image :src="userInfo.avatarUrl" class="avatar"></image>
						<text>{{userInfo.nickName}}</text>
					</view>
					<view class="btn" @click="toLogin" v-else>
						<text>登录</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content-box">
			<!-- 按钮面板 -->
			<view class="panel">
				<view class="single-item" @click="goFacePage">
					<image src="../../static/mine01.png" class="icons"></image>
					<text>人脸采集</text>
				</view>
				<view class="single-item">
					<image src="../../static/mine02.png" class="icons"></image>
					<text>游玩攻略</text>
				</view>
				<view class="single-item" @click="aboutUs">
					<image src="../../static/mine03_.png" class="icons"></image>
					<text>关于途咪</text>
				</view>
			</view>

			<!-- 我的游记 -->
			<view class="my-travel">
				<view class="title">
					<view class="text">
						<text>我的游记</text>
						<view class="remind"></view>
					</view>
					<view class="title-underline"></view>
					<view class="tips">
						<text>{{isLogin?'视频最长保留一周，请及时下载':'请登录后查看游记'}}</text>
					</view>
				</view>

				<!-- 游记列表 -->
				<list :dataList="travelList" />

			</view>
		</view>
	</view>
</template>

<script>
	// 公用导航组件
	import navbar from '../../components/nav.vue'
	// 游记列表组件
	import list from './components/list.vue'
	// 查询游记接口
	import {
		queryTravel
	} from '../../api/mine.js'
	export default {
		data() {
			return {
				topHeight: 0,
				immersive: true, //是否沉浸式导航栏
				isLogin: false, //判断是否登录
				userInfo: {}, //用户信息
				travelList: [] //游记数据
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
			list
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		padding-bottom: 150rpx;
	}

	.user-bg {
		height: 260rpx;
		position: relative;

		&>image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}



		.user-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 35rpx;

			.user-info {
				display: flex;
				align-items: center;
				width: 100%;

				.user {
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 100%;
					width: 100%;
					font-size: 34rpx;
					font-weight: 700;

					.avatar {
						width: 130rpx;
						height: 130rpx;
						margin-bottom: 20rpx;
						border-radius: 50%;
					}
				}



				.btn {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 0 auto;
					width: 265rpx;
					margin-top: 50rpx;
					height: 75rpx;
					background: #fff;
					border-radius: 44rpx;
					color: #4D4A45;
					box-shadow: 0px 7px 7px 0px rgba(78, 78, 78, 0.19);

					text {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
					}
				}

			}
		}

	}

	.content-box {
		position: relative;
		z-index: 99;
		background: #fff;
		transform: translateY(-25rpx);
		border-radius: 27rpx 27rpx 0px 0px;
		padding: 0 55rpx;

		.panel {
			position: relative;
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			color: #999;
			padding: 55rpx 55rpx;


			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				width: 546rpx;
				height: 0.5rpx;
				background: #E2E2E2;
			}

			.single-item {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				.icons {
					width: 79rpx;
					height: 79rpx;
					margin-bottom: 30rpx;
				}

				/* 通知圆点 */
				.notice-dot {
					position: absolute;
					top: 0;
					width: 14rpx;
					height: 14rpx;
					background: rgba(251, 60, 56, 1);
					box-shadow: 0px 0px 19rpx 2rpx rgba(244, 40, 35, 0.29);
					border-radius: 50%;
					right: 0;
				}
			}
		}

		.my-travel {
			margin-top: 65rpx;
			margin-bottom: 55rpx;

			.title {
				position: relative;


				.text {
					display: flex;

					&>text {
						font-size: 40rpx;
						font-weight: 700;
					}

					.remind {
						width: 10rpx;
						height: 10rpx;
						background: #FC4541;
						box-shadow: 0px 0px 20rpx 1rpx rgba(244, 40, 35, 0.29);
						border-radius: 50%;
						margin-left: 12rpx;
					}
				}

				.title-underline {
					width: 38rpx;
					height: 8rpx;
					background: rgba(250, 200, 60, 1);
					margin-top: 12rpx;
					border-radius: 3rpx;
				}

				.tips {
					font-size: 30rpx;
					color: #999;
					margin-top: 18rpx;
				}



			}
		}


	}
</style>
