<template>
	<view class="upload">
		<view class="top-box">
			<!-- 背景图片 -->
			<image src="../../static/yellow1.png"></image>
			<!-- 文字信息 -->
			<view class="text-box">
				<view class="top-area">
					<view class="location">
						<text>{{sceneryName}}</text>
					</view>
					<text>视频之旅已开启</text>
				</view>
				<!-- 提示文字 -->
				<view class="tips">
					<text>1.上传对应景区的自拍视频，可与近期行程合成个性游记</text>
					<text>2.上传视频文件请控制在{{uploadVideoMaxSize}}M以内，建议不超过{{uploadVideoDuration}}秒</text>
				</view>
			</view>
		</view>
		<scroll-view class="upload-panel" scroll-y>
			<!-- 标题 -->
			<view class="title">
				<text>上传自拍视频</text>
			</view>


			<view class="upload-wrapper">
				<template v-for="(item,index) in uploadData">
					<view class="item" :key="index">
						<view class="single">
							<video :id="index" class="myVideo" :src="item.fileUrl" objectFit="fill" autoplay></video>
						</view>
						<view class="rechoose">
							<text>重新选择</text>
						</view>
						<image src="../../static/del.png" bindtap="delVideoFn"></image>
					</view>
				</template>

				<view class="upload-box" bindtap="chooseVideoFn">
					<image src="../../static/add.png"></image>
				</view>

			</view>
		</scroll-view>
		<view class="btn" bindtap="submitFn">
			<text>提交</text>
			<!-- <text wx:if="{{isUpload}}">自拍视频已提交</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uploadData: [1, 2, 3, 4, 5]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	/* 顶部盒子 */
	.top-box {
		position: fixed;
		height: 435rpx;
		top: 0;
		width: 100%;
		color: #fff;

		image {
			width: 100%;
			height: 100%;
		}


		.text-box {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;

			.top-area {
				height: 100rpx;
				display: flex;
				flex-flow: column;
				justify-content: space-between;
				align-items: center;
				margin: 50rpx 0;

				.location {
					display: flex;
					justify-content: center;
					font-size: 40rpx;
					align-items: center;
					font-weight: bold;
					position: relative;

					&+text {
						display: flex;
						justify-content: center;
						font-size: 34rpx;
					}
				}
			}

			.tips {
				display: flex;
				flex-flow: column;
				padding-left: 63rpx;
				height: 74rpx;
				justify-content: space-between;
				font-size: 26rpx;
			}
		}
	}

	/* 上传面板 */
	.upload-panel {
		position: absolute;
		border-radius: 30rpx;
		background-color: white;
		width: 700rpx;
		top: 300rpx;
		bottom: 130rpx;
		left: 0;
		right: 0;
		margin: auto;
		box-shadow: 10rpx 0 50rpx rgba(0, 0, 0, 0.2);

		.title {
			margin-top: 50rpx;
			margin-left:30rpx
;			font-size: 36rpx;
			font-weight: 700;
		}

		.upload-wrapper {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 40rpx;
			padding: 50rpx 30rpx;
			
			.item {
				position:relative;
				display: flex;
				flex-flow: column;
				align-items: center;

				.single {
					height: 168rpx;
					width: 299rpx;
					
					video{
						width:100%;
						height:100%;
					}
				}

				.rechoose {
					background-color: rgba(255, 89, 62, 1);
					border-radius: 25rpx;
					width: 196rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					box-shadow: 0px 8rpx 16rpx 0px rgba(242, 82, 80, 0.3);
					font-size: 26rpx;
					margin-top: 20rpx;
				}
				
				image{
					position:absolute;
					top:-15rpx;
					right:-15rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}



			.upload-box {
				background-color: rgba(0, 0, 0, 0.1);
				width: 299rpx;
				height: 168rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 43rpx;
					height: 43rpx;
				}
			}

		}

	}


	/* 提交按钮 */
	.btn {
		position: fixed;
		bottom: 21rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 638rpx;
		border-radius: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 88rpx;
		z-index: 500;
	}
</style>
