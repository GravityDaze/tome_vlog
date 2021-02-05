<template>
	<view class="list">
		<view class="item" @click="watchVideo(item.id)" v-for="(item,index) in dataList" :key="index">
			<!-- <view class="mask"></view> -->
			<view class="left">
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
					<image src="../../../static/state.png" mode=""></image>
					<text>{{item.describe?'已发布':'未发布'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			}
		},
		methods: {
			watchVideo(id) {
				uni.navigateTo({
					url: `/pages/myVideo/myVideo?videoId=${id}`
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
				
				view{
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
