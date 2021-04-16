<!-- 我的页面 -->
<template>
	<view class="mine" v-show="isLogin !== null">
		<navbar ref="navbar" :immersive="immersive">
			<view slot="center">
				<text>个人中心</text>
			</view>
		</navbar>
		<!-- 用户资料 -->
		<view class="user-bg" :style="{paddingTop:`${topHeight}px`}">
			<view class="mask"></view>
			<view class="user-container" v-if="isLogin">
				<view class="user-info">
					<view class="user">
						<image :src="userInfo.avatarUrl" class="avatar"></image>
						<text>{{userInfo.nickName}}</text>
					</view>
				</view>
				<view class="bottom">
					<view class="data">
						<view>
							<text>{{count.scenery}}</text>
							<text>景点</text>
						</view>

						<view @click="checkMsg(0)">
							<text>{{count.comment}}</text>
							<text>回复</text>
						</view>

						<view @click="checkMsg(1)">
							<text>{{count.like}}</text>
							<text>点赞</text>
						</view>
					</view>

					<view class="edit" @click="goFacePage">
						<image src="../../static/edit.png" mode=""></image>
						<text>编辑人脸</text>
					</view>
				</view>

			</view>
		</view>

		<template v-if="isLogin">
			<view class="tabs">
				<view class="item">
					<view :class="['single-item',{ active: current === 0 ,hint:msg.noReadCount >= 1}]" @click="current = 0">
						<text>我的游记</text>
					</view>
					<view :class="['single-item',{ active: current === 1, hint:msg.noReadBuy === 1 }]" @click="current = 1">
						<text>已购视频</text>
					</view>
				</view>
			</view>
			<view class="tips">
				<text v-show="current === 0">视频最长保留一周，请及时购买</text>
				<text v-show="current === 1">已购买的视频都在这哟~</text>
			</view>

			<view class="content-box">
				<!-- 我的游记 -->
				<list :dataList="travelList" v-show="current === 0" @refresh-list="refreshList" />
				<!-- 已购视频 -->
				<buyList :dataList="buyListData" v-show="current === 1" @update-list="getBuyList"></buyList>
			</view>
		</template>

		<!-- 未登录提示 -->
		<view class="login-tips" v-else>
			<image src="../../static/login-tips.png"></image>
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
		queryBuyList,
		queryMySceneryCount,
		queryCommentCount,
		queryLikeCount
	} from '../../api/mine.js'
	export default {
		data() {
			return {
				current: 0,
				topHeight: 0,
				immersive: true, //是否沉浸式导航栏
				isLogin: null, //判断是否登录
				userInfo: {}, //用户信息
				travelList: [], //游记数据
				buyListData: [], //已购买的视频数据
				count: {}, //统计数据
				msg: {} // hint

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
					this.getBuyList()
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
			checkLoginStatus() {
				const token = uni.getStorageSync('access_token')
				const userInfo = uni.getStorageSync('userInfo')
				if (token && userInfo) {
					this.userInfo = userInfo
					this.isLogin = true
					// 获取游记数据
					this.getList()
					// 获取点赞/回复数据
					this.getMsgValue()
				} else {
					this.isLogin = false
				}
			},

			// 获取我的游记数据
			async getList() {
				try {
					const [msg, list] = await Promise.all([
						queryMsg(),
						queryTravel()
					])
					this.msg = msg.value
					this.travelList = list.value.info
				} finally {
					uni.stopPullDownRefresh()
				}

			},

			// 获取已购视频列表
			async getBuyList() {
				try{
					const res = await queryBuyList()
					this.buyListData = res.value.list
				}finally{
					uni.stopPullDownRefresh()
				}
				
			},

			// 刷新列表
			refreshList() {
				this.getList()
			},

			async getMsgValue() {
				const [commentData, likeData, sceneryData] = await Promise.all([
					queryCommentCount(),
					queryLikeCount(),
					queryMySceneryCount()
				])
				this.count = {
					comment: commentData.value,
					like: likeData.value,
					scenery: sceneryData.value
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
				uni.navigateTo({
					url: '/pages/face/face'
				})
			},

			// 跳转至消息页面
			checkMsg(type) {
				uni.navigateTo({
					url: `/pages/message/message?type=${type}`
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

		onPullDownRefresh() {
			if(!this.isLogin) return uni.stopPullDownRefresh()
			if (this.current === 0) {
				this.getList()
			} else {
				this.getBuyList()
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
		background: url(https://tomevideo.zhihuiquanyu.com/20210208150344.jpg) no-repeat center center;
		background-size: cover;

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
			flex-flow: column;
			padding: 0 35rpx;
			height: 100%;

			.user-info {
				display: flex;
				align-items: center;
				width: 100%;

				.user {
					position: relative;
					display: flex;
					align-items: center;
					height: 100%;
					width: 100%;
					font-size: 34rpx;
					font-weight: 700;

					&>image {
						width: 130rpx;
						height: 130rpx;
						margin-right: 15rpx;
						border-radius: 50%;
					}
				}
			}

			.bottom {
				display: flex;
				flex: 1;
				justify-content: space-between;
				align-items: center;

				.data {
					display: flex;
					margin-left: 32rpx;
					align-items: center;

					&>view {
						display: flex;
						margin-right: 50rpx;
						flex-flow: column;
						align-items: center;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: grey;

						text:first-child {
							font-weight: bold;
							color: #202020;
							font-size: 30rpx;
						}
					}
				}

				.edit {
					width: 170rpx;
					height: 50rpx;
					background: #FFCB3E;
					border-radius: 30rpx;
					font-size: 24rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					// box-shadow: 0 0 20rpx 5rpx rgba(0, 0, 0, 0.2);

					image {
						width: 26rpx;
						height: 26rpx;
						margin-right: 8rpx;
					}
				}
			}

		}


	}


	.tabs {
		width: 450rpx;
		margin: auto;

		.item {

			display: flex;
			justify-content: space-around;

			.single-item {
				font-size: 30rpx;
				color: #202020;
			}

			.hint {
				position: relative;

				&::before {
					content: "";
					position: absolute;
					right: -15rpx;
					top: 0;
					height: 12rpx;
					width: 12rpx;
					background: #FB3C38;
					box-shadow: 0px 0px 19rpx 2rpx rgba(244, 40, 35, 0.29);
					border-radius: 50%;
				}
			}

			.active {
				font-weight: bold;
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

	.tips {
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #B9B9B9;
		text-align: center;
		padding: 20rpx 0;

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
