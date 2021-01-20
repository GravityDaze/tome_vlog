<!-- 视频详情页面 -->
<template>
	<view>
		<video id="video" style="width:100%" autoplay :src="videoInfo.url" objectFit="fill"></video>
		<template v-if="type === ''">
			<view></view>
		</template>
		<template v-else>
			<!-- 视频详细信息面板 -->
			<view class="details">
				<view class="top-info">
					<view class="title">
						<text>{{videoInfo.describe}}</text>
					</view>
					<view class="location">
						<text>{{videoInfo.sceneryName}}</text>
					</view>
				</view>
				<view class="bottom-info">
			
					<view class="user">
						<image :src="videoInfo.headUrl"></image>
						<text>{{videoInfo.shareCustomer}}</text>
					</view>
					<view class="like">
						<image src="../../static/like.png"></image>
						<text>{{videoInfo.laudTimes}}</text>
					</view>
				</view>
			</view>
			<!-- 评论区 -->
			<comment v-if="type === 0" />
			<!-- 我也要拍 -->
			<view class="btn" v-if="type === 0">
				<text>我也要拍</text>
			</view>
		</template>
		

	</view>
</template>

<script>
	// 解密视频url
	import {
	  JSEncrypt
	} from '../../utils/jsencrypt.js';
	import { queryVideoInfo,queryShareVideoInfo } from '../../api/video.js'
	import comment from './components/comment.vue'
	export default {
		data() {
			return {
				videoInfo:{},
				type:''
			}
		},
		onLoad(options) {
			/** 
			 * 进入本页面有几种type,控制组件类型的显隐
			 * 0 => 从分享视频进入
			 * 1 => 从我的视频进入 / 已购买
			 * 2 => 从我的视频进入 / 未购买
			 * ...待续
			**/
			this.type = options.type
			switch(options.type){
				case '0':
					this.getShareVideoInfo(options.videoShareId)
				break;
				
				case ('1' || '2'):
					this.getVideoInfo(options.videoId)
				break;
			}
	
		},
		methods: {
			// 解析分享视频
			async getShareVideoInfo(videoShareId){
				const res = await queryShareVideoInfo({
					videoShareId
				})
				this.videoInfo = this.handleVideoUrl(res) 
			},
			// 解析我的视频
			async getVideoInfo(videoId){
				const res = await queryVideoInfo({
					videoId
				})
				this.videoInfo = this.handleVideoUrl(res) 
			},
			
			// 处理解密视频
			handleVideoUrl(res){
				const encryptByRsa = (text, privateKey) => {
				  const encrypt = new JSEncrypt();
				  encrypt.setPrivateKey(privateKey);
				  return encrypt.decrypt(text);
				}
				res.value.url = encryptByRsa(res.value.url,getApp().globalData.encryptKey)
				return res.value
			},
			
		},
		components:{
			comment
		}
	}
</script>

<style lang="scss" scoped>
	.details {
		padding: 25rpx;
		display: flex;
		flex-direction: column;
		border-bottom:20rpx solid rgb(247, 247, 247);

		.top-info {
			display: flex;
			justify-content: space-between;
			align-items: center;


			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333332;
			}

			.location {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999896;
			}


		}

		.bottom-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 28rpx;

			.user {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: 500;
				color: #999996;

				image {
					width: 48rpx;
					height: 48rpx;
					box-shadow: 0px 0px 12px 0px rgba(62, 62, 62, 0.11);
					border-radius: 50%;
					margin-right: 9rpx;
				}
			}

			.like {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-family: San Francisco Display;
				font-weight: 400;
				color: #999896;

				image {
					width: 32rpx;
					height: 29rpx;
					margin-right: 9rpx;
				}
			}

		}
	}
	
	.btn {
		background-color: rgba(250, 200, 60, 1);
		box-shadow: 0rpx 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
		width: 700rpx;
		height: 88rpx;
		border-radius: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 40rpx;
		left:50%;
		transform: translateX(-50%);
	}
</style>
