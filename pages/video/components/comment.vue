<template>
	<view class="comment">
		<view class="title">
			<text>全部评论</text>
			<text>(584)</text>
		</view>
		<!-- 评论列表 -->
		<view class="list">
			<image src="../../../static/bad.png"></image>
			<text>当前视频的评论已关闭</text>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.comment{
		padding:30rpx 25rpx;
		
		.title{
			color:#333332;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			
			text:last-child{
				color:#999896;
				font-weight:normal;
				margin-left:15rpx;
			}
		}
		
		.list{
			display:flex;
			align-items:center;
			justify-content: center;
			font-size:30rpx;
			color:#bfbfbf;
			margin-top:55rpx;
			
			image{
				margin-right:10rpx;
				width:35rpx;
				height:35rpx;
			}
		}
	}
	
	
</style>
