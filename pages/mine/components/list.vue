<template>
	<view class="list">
		<template v-for="(item,index) in dataList">
			<view class="list-item" v-for="(subItem,subIndex) in item.dateInfo" :key="subIndex">
				<!-- 时间线 -->
				<view class="timeline">
					<text>{{subItem.date}}</text>
					<view class="greyline"></view>
				</view>
				<view class="content">
					<!-- 如果内容是视频 -->
					<view class="video-area" v-if="subItem.status === 2">
						<template v-for="(videoItem,videoIndex) in subItem.videoInfo">
							<view class="video-box" :key="videoItem.videoId"  @click="watchVideo(videoItem)">
								<view class="cover" :style="{backgroundImage:`url(${videoItem.coverUrl})`}">
									<view v-if="videoItem.newRead === 0" class="new">
										<text>NEW !</text>
									</view>
									<view class="duration">
										<text>{{videoItem.duration}}</text>
									</view>
								</view>
								<view class="tips" v-if="videoItem.buyStatus === 0">
									<image src="../../../static/time.png" class="icon_time"></image>
									<text v-if="videoItem.expiredTime <= 1" style="color:red">即将过期被清除</text>
									<text v-else>{{videoItem.expiredTime}}天后自动清除</text>
								</view>
							</view>
						</template>
					</view>

					<!-- 如果内容不是视频,显示通知面板 -->
					<view class="notification" v-if="subItem.status !== 2">
						<!-- status 0 合成中 -->
						<template v-if="subItem.status === 0">
							<view class="text-area">
								<text>“视频之旅”已开启</text>
								<text>上传本地视频，还可以合成个性游记哦 </text>
							</view>
							<view class="panel-btn">
								<text>上传自拍视频</text>
							</view>
						</template>

						<!-- status 1 正在合成 -->
						<template v-if="subItem.status === 1">
							<view class="text-area">
								<text>“视频之旅”正在合成</text>
								<text>景区视频正在合成中，稍后可进行查看</text>
							</view>
						</template>

						<!-- status 3 合成失败 -->
						<template v-if="subItem.status === 3">
							<view class="text-area">
								<text>“视频之旅”合成失败</text>
								<text>未在景区摄像头中识别到您的图像
									请查看头像采集是否清晰</text>
							</view>
							<view class="panel-btn fail-status" @click="checkFace">
								<text>查看人脸采集</text>
							</view>
						</template>
					</view>

				</view>
				<!-- 定位 -->
				<view class="location">
					<image src="../../../static/locationy.png"></image>
					<text>{{item.sceneryName}}</text>
				</view>
			</view>
		</template>
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
		methods:{
			watchVideo(item){
				const type = item.buyStatus
				uni.navigateTo({
					url:`/pages/myVideo/myVideo?videoId=${item.videoId}&type=${type}`
				})
			},
			checkFace(){
				uni.navigateTo({
					url:"/pages/face/face"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		.list-item {
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
					height: 0.5rpx;
					background: #ececec;
				}

			}

			.content {
				margin-top: 20rpx;

				/* 视频区域 */
				.video-area {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 40rpx;

					.video-box {
						position: relative;
						width: 300rpx;
						/* height: 230rpx; */
						display: flex;
						flex-direction: column;
						align-items: center;

						.cover {
							position: relative;
							width: 300rpx;
							height: 175rpx;
							border-radius: 15rpx;
							background-size: cover;
							display: flex;
							box-shadow: 10rpx 0 50rpx rgba(0, 0, 0, 0.2);
							
							.new{
								position:absolute;
								top:0;
								left:0;
								width: 74rpx;
								height: 32rpx;
								background: linear-gradient(199deg, #FFB70D, #FFD505);
								box-shadow: 0px 4rpx 5rpx 0px rgba(70, 50, 0, 0.24);
								border-radius:15rpx 0 15rpx 0;
								font-size: 18rpx;
								font-family: San Francisco Display;
								font-weight: bold;
								color: #FFFFFF;
								display:flex;
								justify-content: center;
								align-items: center;
							}

							.duration {
								position: absolute;
								right: 18rpx;
								bottom: 15rpx;
								font-weight: 400;
								color: rgba(255, 255, 254, 1);
								font-size: 20rpx;
							}
						}
						
						.tips {
						  margin-left: -75rpx;
						  margin-top: 10rpx;
						  display: flex;
						  justify-content: flex-start;
						  align-items: center;
						  font-size: 22rpx;
						  color: #999;
						  
						  image{
								width: 25rpx;
							    height: 25rpx;
							    margin-right: 15rpx;
						  }
						}

					}

				}


				.notification {
					border-radius: 30rpx;
					background: #fff;
					box-shadow: 10rpx 0 100rpx rgba(0, 0, 0, 0.1);
					padding: 30rpx 15rpx 0;
					box-sizing: border-box;
					height: 180rpx;
					display: flex;
					justify-content: space-between;

					.text-area {
						display: flex;
						flex-direction: column;

						&>text:first-child {

							color: #333332;
							font-size: 36rpx;
							font-weight: 700;
						}

						&>text:last-child {
							font-size: 24rpx;
							color: #999;
							margin-top: 20rpx;
						}


					}

					/* 按钮 */
					.panel-btn {
						border-radius: 27rpx;
						background-color: rgba(250, 200, 60, 1);
						color: #333332;
						font-size: 24rpx;
						width: 188rpx;
						height: 54rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						box-shadow: 0px 8rpx 37rpx 1rpx rgba(248, 185, 14, 0.29);

					}


					.fail-status {
						background: rgba(252, 69, 65, 1);
						color: #fff;
						box-shadow: 0px 0px 24rpx 0px rgba(244, 40, 35, 0.29);
					}

				}

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

				image {
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
