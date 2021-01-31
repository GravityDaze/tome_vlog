<template>
	<view class="hot-scenery">
		<view class="title-bar">

			<text class="title">周边景区</text>
			<!-- <view class="more" @click="seeMore">
				<text>查看全部</text>
				<image src="../../../static/arrow.png"></image>
			</view> -->
		</view>

		<view class="scenery-list">
			<scroll-view scroll-x enable-flex class="list" enhanced :show-scrollbar="false">
				<view class="card-wrapper">
					<navigator :url="`/pages/shoot/shoot?id=${item.id}`" v-for="(item,index) in list" :key="index" class="scenery-card"
					 :style="{backgroundImage:`url(${item.coverUrl})`,border:item.isOpen===1?'1rpx solid #FFB90C':'none'}">
						<view class="mask"></view>
						<image v-if="item.hotStatus === 1" src="../../../static/recommend.png"></image>
						<view class="text">
							<view class="name">
								<text>{{handleText(item.name,5)}}</text>
							</view>
							<view class="desc" :class="{ 'open':item.isOpen === 1 }">
								<text>{{item.isOpen === 1 ? '开拍中':handleText(item.describe,6) }}</text>
							</view>
						</view>
					</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		handleText
	} from '../../../utils/handleText.js'
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
			seeMore() {
				uni.navigateTo({
					url: '/pages/sceneryList/sceneryList'
				})
			},
			handleText(...arg) {
				return handleText(...arg)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-scenery {
		.title-bar {
			padding: 35rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333332;
			}

			.more {
				display: flex;
				align-items: center;
				font-size: 22rpx;
				font-weight: 400;
				color: #B5B3B2;

				image {
					padding-left: 8rpx;
					width: 13rpx;
					height: 24rpx;
				}
			}
		}

		.scenery-list {
			padding-left: 30rpx;
			height: 185rpx;

			.card-wrapper {
				padding-right: 15rpx;
				display: flex;
				height: 100%;
				align-items: center;
			}

			.list {
				display: flex;
				height: 100%;
				// align-items: center;

				.scenery-card {
					flex-shrink: 0;
					position: relative;
					width: 238rpx;
					height: 168rpx;
					border-radius: 18rpx;
					background-size: cover;
					background-position: center center;
					box-shadow: 0px 4rpx 10rpx 0px rgba(0, 0, 0, 0.27);
					margin-right: 15rpx;
					box-sizing: border-box;

					&>image{
						position:absolute;
						left:20rpx;
						top:-7rpx;
						width: 45rpx;
						height: 62rpx;
						z-index:99;
					}

					.mask {

						position: absolute;
						background: rgba(57, 57, 57, .25);
						top: 0;
						bottom: 0;
						width: 100%;
						border-radius: 18rpx;
					}

					.text {
						display: flex;
						flex-direction: column;
						position: relative;
						z-index: 20;
						// justify-content: center;
						padding-top: 58rpx;
						align-items: center;
						height: 100%;

						.name {
							color: #fff;
							font-size: 28rpx;
							font-weight: 800;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-bottom: 5rpx;
						}

						.desc {
							background: rgba(40, 40, 40, .5);
							border-radius: 16rpx;
							font-size: 22rpx;
							font-weight: 500;
							color: #FFFFFF;
							padding: 3rpx 15rpx;
						}
						
						.open{
							background: #FFB90C;
						}

					}
				}

			}

		}

	}
</style>
