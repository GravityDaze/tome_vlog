<template>
	<view class="list">
		<view class="list-item">
			<!-- 时间线 -->
			<view class="timeline">
				<text>2021-01-01</text>
				<view class="greyline"></view>
			</view>
			<view class="content">
				爱丽丝梦游仙境
			</view>
			<!-- 定位 -->
			<view class="location">
				<image src="../../../static/locationy.png"></image>
				<text>弥留之国</text>
			</view>
		</view>
		
		<view class="list-item">
			<!-- 时间线 -->
			<view class="timeline">
				<text>2021-01-01</text>
				<view class="greyline"></view>
			</view>
			<view class="content">
				It's my own invention
			</view>
			<!-- 定位 -->
			<view class="location">
				<image src="../../../static/locationy.png"></image>
				<text>镜之国</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.list{
		.list-item{
			margin-top: 50rpx;
			
			// 时间线
			.timeline {
			  font-size: 28rpx;
			  color: #999896;
			  display: flex;
			  justify-content: space-between;
			  align-items: center;
			  
			  .greyline {
			    width: 450rpx;
			    border: 0.5rpx solid rgba(220, 220, 220, 1);
			  }
			  
			}
			
			.content{
				 color: #999;
				   font-size: 28rpx;
				   padding:25rpx 0;
			}
			
			
			// 定位
			.location {
			  font-size: 24rpx;
			  color: #999;
			  display: inline-block;
			  padding: 0 20rpx 0 0;
			  height: 40rpx;
			  line-height: 40rpx;
			  margin-top: 20rpx;
			  border-radius: 20rpx;
			  background-color: rgba(220, 220, 220, 0.5);
			  
			  image{
			    width: 25rpx;
			    height: 29rpx;
			    margin-left: 15rpx;
			    margin-right: 8rpx;
			    vertical-align: -4rpx;
			  }
			}
		}
	}
	
</style>
