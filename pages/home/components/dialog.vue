<template>
	<view class="dialog" @touchmove.stop.prevent="moveHandle" v-if="show">
		<view class="mask"></view>
		<view class="dialog-box">
			<view class="box-top">
				<image src="../../../static/area.png"></image>
				<view class="box-text1">
					<text>你当前在游览 </text>
					<text>{{name.length>6?name.substr(0,6)+'...':name}}</text>
				</view>
				<view class="box-text2">
					<text>是否开启视频之旅</text>
				</view>
			</view>
			<view class="box-bottom">
				<view class="change-scenery" @click="changeScenery">
					<text>切换景区</text>
					<image src="../../../static/arrow.png" class="right_icon"></image>
				</view>
				<view class="button">
					<text>立即开始</text>
				</view>
				<view class="close-icon" @click="closeDialog">
					<image src="../../../static/close.png" class="dialog01_del"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show:{
				default:false,
				type:Boolean
			},
			name:{
				default:"",
				type:String
			}
		},
		methods: {
			closeDialog(){
				this.$emit("close")
			},
			
			// 防止滚动穿透
			moveHandle(){
				return
			},
			
			// 切换景区
			changeScenery(){
				uni.navigateTo({
					url:"/pages/sceneryList/sceneryList"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* components/dialog01/dialog01.wxss */

	/* 蒙版层 */
	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		transition: opacity .4s;
		z-index: 9998;
	}

	.dialog-box {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 30rpx;
		height: 782rpx;
		width: 699rpx;
		display: flex;
		flex-direction: column;
		transition: 0.4s;
		z-index: 9999;

		.box-top {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 459rpx;
			border-radius: 30rpx 30rpx 0 0;
			background-color: rgba(247, 247, 247, 1);

			image {
				margin: 0 auto;
				width: 399rpx;
				height: 189rpx;
				opacity: 0.82;
			}

			.box-text1 {
				// display:flex;
				margin-top: 21rpx;
				font-size: 44rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 50, 1);
				
				text{
					padding:0 10rpx;
				}
				
			}

			.box-text2 {
				margin-top: 25rpx;
				height: 36rpx;
				font-size: 38rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(153, 152, 150, 1);
			}

		}




		.box-bottom {
			background-color: #fff;
			flex: 1;
			border-radius: 0 0 30rpx 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.change-scenery {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(153, 152, 150, 1);
			}

			.button {
				background-color: rgba(255, 203, 62, 1);
				width: 380rpx;
				height: 88rpx;
				border-radius: 44rpx;
				margin-top: 60rpx;
				box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
				font-size: 30rpx;
				color: #000;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.right_icon {
				width: 12rpx;
				height: 21rpx;
				margin-left: 15rpx;
			}
			
			
			
			.close-icon {
				position: absolute;
				bottom: -88rpx;
				
				image{
					width: 54rpx;
					height: 54rpx;
					border: rgba(255, 255, 255, 1);
					border-radius: 50%;
				}
			}
		}

		
	}
</style>
