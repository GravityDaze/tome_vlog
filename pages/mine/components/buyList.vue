<template>
	<view class="list">
		<view class="item" @click="watchVideo(item)" v-for="(item,index) in dataList" :key="index">
			<!-- <view class="mask"></view> -->
			<view class="left">
				<view class="hint" v-if="item.buyRead === 0">
					<text>NEW</text>
				</view>
				<image :src="item.coverUrl" mode=""></image>
				<view class="duration">
					<text>{{item.duration}}</text>
				</view>
			</view>
			<view class="right">
				<view class="top">
					<text>{{item.sceneryName + '-视频之旅'}}</text>
					<text>{{item.createDatetime}}</text>
				</view>

				<view class="bottom">
					<image v-if="!item.describe" src="../../../static/state.png" mode=""></image>
					<image v-else src="../../../static/state_success.png" mode=""></image>
					<text :style="{color: item.describe?'#83cf20':'#A3A3A3' }">{{item.describe?'已发布':'未发布'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { updateBuyVideoStatus } from '../../../api/mine.js'
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			}
		},
		methods: {
			watchVideo(item) {
				uni.navigateTo({
					url: `/pages/myVideo/myVideo?videoId=${item.id}`,
					success:async _=>{
						if(item.buyRead === 0){
							// 通知已购视频页面刷新dataList 
							await updateBuyVideoStatus({
								videoId:item.id
							})
							this.$emit('update-list')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {

		.item {
			display: flex;
			padding: 30rpx;
			height: 155rpx;


			.left {
				position:relative;
				flex: 2;
				
			
				
				.hint{
					position:absolute;
					width: 74rpx;
					height: 32rpx;
					background: linear-gradient(199deg, #97ce1e, #96ce1d);
					right: 10rpx;
					 top: 10rpx;
					font-size: 20rpx;
					color: #FFFFFF;
					display:flex;
					justify-content: center;
					align-items: center;
					border-radius: 8rpx;
					
					background:linear-gradient(
					 100deg,
					 rgba(255,255,255,0) 40%,
					 rgba(255,255,255,.5) 50%,
					 rgba(255,255,255,0) 60%
					 ) #97ce1e;
					background-size: 200% 100%;
					background-position-x: 150%;
					animation: 1.5s light ease-in-out infinite;
					
				}
							
				
				@keyframes light{
					to{
						background-position-x: -20%;
					}
				}
				
				.duration{
					position:absolute;
					right:10rpx;
					bottom:10rpx;
					background: rgba(0,0,0,.4);
					padding:5rpx 8rpx;
					color:#fff;
					font-size:20rpx;
					border-radius:10rpx;
				}
				
				image {
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
				}
			}

			.right {
				flex: 3;
				margin-left: 20rpx;
				display: flex;
				flex-flow: column;
				justify-content: space-between;

				.top {
					display: flex;
					flex-flow: column;

					text:first-child {
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #1F1F1F;
						padding-bottom:10rpx;
					}

					text:last-child {
						font-size: 24rpx;
						font-family: San Francisco Display;
						font-weight: 400;
						color: #A3A3A3;
					}
				}


			}


			.bottom {

				display: flex;
				align-items: center;
				font-size: 22rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #A3A3A3;

				image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}

			}

			.play {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 45rpx;
				height: 45rpx;
				z-index: 2;
			}
		}
	}
</style>
