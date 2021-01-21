<template>
	<!-- 分享弹框 -->
	<view class="shareModal">
		<view class="item-box">
			<view class="item">
				<button style="position:absolute;top:0;bottom:0;width:100%;opacity:0" open-type="share"></button>
				<image src="../../../static/wxicon.png"></image>
				<text>微信好友</text>
			</view>

			<view class="item">
				<image src="../../../static/pyq.png"></image>
				<text>朋友圈</text>
			</view>

			<view class="item" @click="showPublishModal = true">
				<image src="../../../static/tmicon.png"></image>
				<text class="publish">发布至途咪</text>
			</view>
		</view>

		<view class="btn" @click="cancel">
			<text>取消</text>
		</view>

		<!-- 发布至途咪 -->
		<view :class="[ 'publishModal',showPublishModal?'in':'out' ]">
			<view class="cover">
				<image :src="url"></image>
			</view>
			<view class="tips">
				<text>发布至途咪平台后，视频可公开评论和点赞</text>
			</view>
			<view class="input-box">
				<text>游记说明</text>
				<input maxlength="30" type='text' placeholder-class="placeholder"
				 placeholder='请输入（必填,最大输入长度为30）' />
			</view>
			<view class="publish-btn" bindtap="shareFn">
				<text>立即发布</text>
				<!-- <image wx:else src="/imgs/loading_white.png"></image> -->
			</view>
			<view class="cancel-publish" @click="showPublishModal = false">
				<text>暂不发布</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props:{
			url:{
				default:'',
				type:String
			}
		},
		data() {
			return {
				showPublishModal: false
			}
		},
		methods: {
			cancel() {
				this.$emit('close')
			}
		},
		beforeDestroy() {
			this.showPublishModal = false
		}
	}
</script>

<style lang="scss" scoped>
	.shareModal {
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 100%;
		height: 339rpx;
		background: #FFFFFF;
		display: flex;
		flex-flow: column;

		.item-box {
			display: flex;
			height: 245rpx;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-around;
			border-bottom: 1rpx solid #d9d9d9;

			.item {
				position: relative;
				display: flex;
				flex-flow: column;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333332;
				flex: 1;


				image {
					width: 78rpx;
					height: 78rpx;
					margin-bottom: 17rpx;
				}

			}

		}

		.btn {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999896;
		}
		
		
		
		.publishModal {
			position: fixed;
			border-radius: 30rpx 30rpx 0 0;
			width: 100%;
			height: 715rpx;
			z-index: 700;
			background-color: white;
			padding: 174rpx 55rpx 0;
			box-sizing: border-box;
			transition: 0.5s;
			bottom: 0;
			transition:0.3s;

			.cover {
				position: absolute;
				top: -174rpx;
				background-color: rgb(119, 115, 115);
				border-radius: 30rpx;
				width: 638rpx;
				height: 348rpx;

				image {
					border-radius: 30rpx;
					width: 638rpx;
					height: 348rpx;
				}
			}

			.tips {
				margin: 31rpx 0 90rpx;
				font-size: 26rpx;
				text-align: center;
				font-family: PingFang SC;
				color: rgba(153, 152, 150, 1);
				line-height: 30rpx;
			}


			.input-box {
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				flex-wrap: nowrap;
				box-sizing: border-box;
				border-top: 1rpx solid rgba(230, 227, 227, 1);
				border-bottom: 1rpx solid rgba(230, 227, 227, 1);
				
				text{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(51, 51, 50, 1);
				}
				
				input{
					text-align: right;
					width: 510rpx;
				}
				
				.placeholder {
					text-align: end;
					font-size: 26rpx;
					font-family: PingFang SC;
					color: rgba(153, 152, 150, 1);
				}
			}

			.publish-btn {
				width: 638rpx;
				height: 88rpx;
				background: rgba(252, 69, 65, 1);
				box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(252, 69, 65, 0.48);
				border-radius: 44rpx;
				margin-top: 90rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				text {
					font-size: 30rpx;
					font-family: PingFang SC;
					color: rgba(255, 255, 255, 1);
				}
				
				image {
					width: 34rpx;
					height: 34rpx;
					animation: rotate .5s linear infinite;
					border-radius: 50%;
				}
			}


			.cancel-publish {
				margin-top: 50rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				text-align: center;
				color: rgba(153, 152, 150, 1);
			}

		}
		
		.in{
			bottom:0;
		}
		
		.out{
			bottom:-100vh;
		}
	}
</style>
