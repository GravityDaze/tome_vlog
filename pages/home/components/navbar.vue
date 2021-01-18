<template>
	<view class="nav" :style="{paddingTop:`${statusBarHeight}px`,height:`${NavHeight}px`,background:immersive?'transpranst':'#fff'}">
		<view class="content">
			<view class="search" :style="{left:`${capsuleLeft}px`,top:`${capsuleTop}px`,height:`${capsuleHeight}px`,background:immersive?'rgba(240, 240, 240, 0.48)':'#F0F0F0'}">
				<view class="search-inner" @click="queryScenery">
					<icon color="#0E0E0E" type="search" size="32rpx" />
					<text>搜索景区 马上打卡</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import nav from ''
	export default {
		data() {
			return {
				statusBarHeight: 0,
				NavHeight: 0,
				capsuleLeft: 0,
				capsuleHeight: 0,
				capsuleTop: 0
			}
		},
		props: {
			immersive: {
				default: true,
				type: Boolean
			}
		},
		created() {
			this.getSysInfo()
		},
		methods: {
			getSysInfo() {
				const sysInfo = uni.getSystemInfoSync()
				const menuButton = uni.getMenuButtonBoundingClientRect()
				console.log(menuButton)
				console.log(sysInfo)
				// 获取状态栏高度
				this.statusBarHeight = sysInfo.statusBarHeight
				// 计算导航条内容栏高度
				this.NavHeight = (menuButton.top - this.statusBarHeight) * 2 + menuButton.height
				// 获取胶囊左侧偏移量
				this.capsuleLeft = sysInfo.screenWidth - menuButton.right
				// 获取胶囊上侧偏移量
				this.capsuleTop = menuButton.top - this.statusBarHeight
				// 获取胶囊高度
				this.capsuleHeight = menuButton.height
			},
			queryScenery(){
				uni.navigateTo({
					url:'/pages/sceneryList/sceneryList'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		position: fixed;
		width: 100%;
		z-index: 100;
		transition: background-color .3s;
	}

	.content {
		position: relative;
		height: 100%;

		.search {
			position: absolute;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-left: 26rpx;
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



		.location {
			position: absolute;
			left: 0;
			color: #333332;
			font-weight: bold;
			text-align: center;

			.location>text {
				font-size: 36rpx;
			}

			.active {
				background: #000;
			}

			&::after {
				content: '▼';
				font-size: 24rpx;
				font-weight: bolder;
				color: #333332;
				margin-left: 8rpx;
			}

		}



	}
</style>
