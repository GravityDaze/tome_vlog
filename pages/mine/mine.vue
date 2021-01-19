<!-- 我的页面 -->
<template>
	<!--pages/mine/mine.wxml-->
	<view class="mine">
		<navbar ref="navbar">
			<view slot="center">
				<text>个人中心</text>
			</view>
		</navbar>
		<!-- 用户资料 -->
		<view class="user-bg" :style="{paddingTop:`${topHeight}px`}">
			<image src="../../static/minebg.png"></image>
			<view class="user-container">
				<view class="user-info">
					<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2180936608,1480355193&fm=26&gp=0.jpg" class="avatar"></image>
					<text>Charlotte</text>
					<!-- <text bindtap="login" wx:else>点击登录</text> -->
				</view>
				<!-- <view class="message" data-onreadmsg="{{msgHit.onReadMsg}}" bindtap="navigateToMsgFn">
					<view wx:if="{{msgHit.onReadMsg == 1}}" class="hit"></view>
					<image src="/imgs/message.png" class="icon_message"></image>
				</view> -->
			</view>
		</view>
		<!-- 按钮面板 -->
		<view class="panel">
			<view class="single-item">
				<image src="../../static/mine01.png" class="icons"></image>
				<text>人脸采集</text>
			</view>
			<view class="single-item">
				<image src="../../static/mine02.png" class="icons"></image>
				<!-- <view class="notice-dot"></view> -->
				<text>已购视频</text>
			</view>
			<view class="single-item">
				<image src="../../static/mine03_.png" class="icons"></image>
				<text>关于途咪</text>
			</view>
		</view>

		<!-- 我的游记 -->
		<view class="my-travel">
			<view class="title">
				<!-- <image src="../../imgs/tips.png" class="icon_tips" wx:if="{{msgHit.noReadCount > 0}}"></image> -->
				<text>我的游记</text>
				<!-- <text class="remind" wx:if="{{msgHit.noReadCount > 0}}" bindtap="openRecentVideo">{{msgHit.noReadCount}}条新游记</text> -->
				<!-- </view> -->
				<view class="title-underline"></view>
				<view class="tips">
					<text>视频最长保留一周，请及时下载</text>
				</view>
			</view>
			
			<!-- 游记列表 -->
			<list />
			
		</view>



	</view>
</template>

<script>
	// 公用导航组件
	import navbar from '../../components/nav.vue'
	// 游记列表组件
	import list from './components/list.vue'
	
	export default {
		data() {
			return {
				topHeight: 0
			}
		},
		onLoad() {
			// 获取到导航栏高度
			this.getNavHeight()
			// 获取我的游记
			
		},
		methods: {
			getNavHeight() {
				const {
					navbar
				} = this.$refs
				this.topHeight = navbar.statusBarHeight + navbar.navHeight
			}
		},
		components: {
			navbar,
			list
		}
	}
</script>

<style lang="scss" scoped>
	.user-bg {
		height: 339rpx;
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
			margin-top: 50rpx;

			.user-info {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34rpx;
				font-weight: 700;

				text {
					margin-left: 15rpx;
				}

				.avatar {
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
				}

			}
		}

	}

	.panel {
		position:absolute;
		width: 700rpx;
		// top:-50%;
		left:50%;
		transform: translate(-50%,-50%);
		margin: 0 auto;
		border-radius: 30rpx;
		background: #fff;
		box-shadow: 10rpx 0 50rpx rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #999;
		padding: 50rpx 60rpx 30rpx;
		box-sizing: border-box;

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
		margin-top:165rpx;
		margin-bottom: 55rpx;
		padding: 0 55rpx;

		.title {
			position: relative;
		
			&>text{
				font-size: 40rpx;
				font-weight: 700;
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

</style>
