<template>
	<view class="promote">
		<view class="title-bar">
			<text class="title">玩转途咪</text>
		</view>
		<view class="banner" @click="to360">
			<swiper interval="10000" class="swiper"  :autoplay="true" circular>
				<swiper-item style="width:100%">
					<view class="guide-cover">
						<image class="cover" src="https://tomevideo.zhihuiquanyu.com/360"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- <carousel :img-list="imgList" url-key="url" @selected="selectedBanner" /> -->
		</view>
	</view>
	</view>
</template>

<script>
	// import carousel from '../../../components/vear-carousel.vue'
	export default {
		data() {
			return {
				imgList: [{
					url: 'https://tomevideo.zhihuiquanyu.com/360',
					id: 1,
					path:'/pages/360/360'
				}, {
					url: 'https://tomevideo.zhihuiquanyu.com/360',
					id: 1,
					path:'/pages/360/360'
				}, {
					url: 'https://tomevideo.zhihuiquanyu.com/360',
					id: 1,
					path:'/pages/360/360'
				}]
			}
		},
		methods: {
			selectedBanner(item) {
				uni.navigateTo({
					url:item.path
				})
			},
			to360(){
				uni.navigateTo({
					url:'/pages/360/360'
				})
			}
		},
		// components: {
			// carousel
		// }
	}
</script>

<style lang="scss" scoped>
	.promote {
		border-radius: 27rpx 27rpx 0 0;
		transform: translateY(-35rpx);
		background: #fff;

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
		}

		.banner {
			position: relative;
			height: 300rpx;
			

			.swiper {
				height: 100%;
				padding: 0 30rpx;

				.guide-cover {
					.cover {
						height: 300rpx;
						width: 100%;
						box-shadow: 0px 8rpx 27rpx 0px rgba(0, 0, 0, 0.06);
						border-radius: 27rpx;
					}
				}
			}
		}
	}
</style>
