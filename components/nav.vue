<!-- 导航条公用组件 -->
<template>
	<view class="nav"
		:style="{paddingTop:`${statusBarHeight}px`,height:`${navHeight}px`,background:immersive?'transpranst':'#fff'}">
		<view class="content">
			<view class="left" :style="{left:`${capsuleLeft}px`,top:`${capsuleTop}px`,height:`${capsuleHeight}px`}">
				<!-- 从左侧开始的自定义插槽 -->
				<slot name="left" v-if="immersive"></slot>
				<!-- 返回按钮 -->
				<view v-if="showBack" @click="back" class="back">
					<image v-show="immersive" src="../static/back_white.png"></image>
					<image v-show="!immersive" src="../static/back_black.png"></image>
				</view>
			</view>
			<!-- 标题插槽 -->
			<view class="center" v-show="!immersive">
				<slot name="center"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				navHeight: 0,
				capsuleLeft: 0,
				capsuleHeight: 0,
				capsuleTop: 0,
				immersive: true
			}
		},
		props: {
			// 控制是否显示返回按钮
			showBack: {
				default: false,
				type: Boolean
			},
			// 滑动多少px显示导航栏
			threshold: {
				default: 50,
				type: Number
			},
			// 当前页面滑动值
			scrollTop: {
				default: 0,
				type: Number
			}
		},
		watch: {
			scrollTop(val) {
				if (val > this.threshold) {
					if (!this.immersive) return
					this.immersive = false
					uni.setNavigationBarColor({
						frontColor: "#000000",
						backgroundColor: "#000000"
					})
				} else {
					if (this.immersive) return
					this.immersive = true
					uni.setNavigationBarColor({
						frontColor: "#ffffff",
						backgroundColor: "#000000"
					})
				}
			}
		},
		created() {
			this.getNavInfo()
		},
		methods: {
			getNavInfo() {
				const sysInfo = uni.getSystemInfoSync()
				const menuButton = uni.getMenuButtonBoundingClientRect()
				// 获取状态栏高度
				this.statusBarHeight = sysInfo.statusBarHeight
				// 计算导航条内容栏高度
				this.navHeight = (menuButton.top - this.statusBarHeight) * 2 + menuButton.height
				// 获取胶囊左侧偏移量
				this.capsuleLeft = sysInfo.screenWidth - menuButton.right
				// 获取胶囊上侧偏移量
				this.capsuleTop = menuButton.top - this.statusBarHeight
				// 获取胶囊高度
				this.capsuleHeight = menuButton.height
			},
			back() {
				uni.navigateBack({
					fail: _ => uni.switchTab({
						url: '/pages/home/home'
					})
				})
			}
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

		.left {
			position: absolute;

			.back {
				height: 100%;
				display: flex;
				align-items: center;

				image {
					padding-left: 5rpx;
					height: 35rpx;
					width: 35rpx;
				}
			}
		}

		.center {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

	}
</style>
