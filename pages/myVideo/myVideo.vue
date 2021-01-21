<!-- '我的'视频详情页面 -->
<template>
	<view>
		<video id="video" style="width:100%" autoplay :src="videoInfo.url" objectFit="fill"></video>
		<!-- 视频详细信息面板 -->
		<view class="details">
			<view class="top-info">
				<view class="title">
					<text>{{videoInfo.sceneryName + '-视频之旅'}}</text>
				</view>
				<view class="location">
					<text>{{videoInfo.sceneryName}}</text>
				</view>
			</view>
			<view class="bottom-info">
				<view class="time">
					<text>{{videoInfo.createDatetime}}</text>
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<!-- 已购视频 -->
			<view class="bought " v-if="videoInfo.buyStatus">
				<view class="cancel-share" v-if="videoInfo.shareStatus" @click="cancelShare">
					<text>取消发布</text>
				</view>
				<view class="btn-group">
					<view class="share" @click="share">
						<text>我要分享</text>
					</view>
					<view class="download" @click="download">
						<text>我要下载</text>
					</view>
				</view>
			</view>
			
			<!-- 未购视频 -->
			
		</view>

		<!-- 遮罩 -->
		<view class="mask" v-if="mask" @click="cancel"></view>
		<!-- 分享组件 -->
		<shareModal @close="cancel" @change="changeShareStatus" :videoInfo="videoInfo"  :show="showModal" />

	</view>
</template>

<script>
	// 解密视频url
	import {
		JSEncrypt
	} from '../../utils/jsencrypt.js';
	// API
	import {
		queryVideoInfo,
		cancelShare
	} from '../../api/video.js'
	// 分享组件
	import shareModal from './componets/shareModal.vue'
	export default {
		data() {
			return {
				videoInfo: {},
				mask: false, //是否展开遮罩
				showModal: false, // 是否展开分享
				publishModal: false // 发布至途咪
			}
		},
		onLoad(options) {
			this.getVideoInfo(options.videoId)
		},
		methods: {
			// 获取分享视频
			async getVideoInfo(videoId) {
				const res = await queryVideoInfo({
					videoId
				})
				this.videoInfo = this.handleVideoUrl(res)
			},

			// 解密视频url
			handleVideoUrl(res) {
				const encryptByRsa = (text, privateKey) => {
					const encrypt = new JSEncrypt();
					encrypt.setPrivateKey(privateKey);
					return encrypt.decrypt(text);
				}
				res.value.url = encryptByRsa(res.value.url, getApp().globalData.encryptKey)
				return res.value
			},

			// 分享视频
			share() {
				this.mask = true
				this.showModal = true
			},
			
			// 下载视频
			download() {

			},

			// 关闭模态框
			cancel() {
				this.mask = false
				this.showModal = false
			},
			
			// 组件发布时改变分享状态
			changeShareStatus(){
				this.$set(this.videoInfo,'shareStatus',true)
			},
			
			// 取消发布
			cancelShare(){
				uni.showModal({
					content:'是否取消发布',
					success:async res=>{
						if(res.confirm){
							uni.showLoading({
								title:'正在取消',
								mask:true
							})
							try{
								const res = await cancelShare({
									videoId:this.videoInfo.id
								})
								uni.showToast({
									title:'取消成功'
								})
								// 更改状态
								this.getVideoInfo(this.videoInfo.id)
							}catch{
								uni.showToast({
									title:'取消失败',
									icon:'none',
								})
							}
						}
					}
				})
			}

		},
		components: {
			shareModal
		}
	}
</script>

<style lang="scss" scoped>
	.details {
		padding: 25rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 20rpx solid rgb(247, 247, 247);

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

			.time {

				font-size: 26rpx;
				font-family: San Francisco Display;
				font-weight: 400;
				color: #999996;
			}

		}
	}

	.bottom-bar {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 97rpx;
		background: #FFFFFF;
		box-shadow: 0px 1rpx 15rpx 3rpx rgba(62, 62, 62, 0.19);
		
		// 已购视频
		.bought{
			display:flex;
			height: 100%;
			
			.btn-group {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				height: 100%;
				flex:1;
				column-gap: 20rpx;
			
				view {
				    flex:1;
					height: 78rpx;
					border-radius: 39rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-left:25rpx;
					
					&:last-child{
						margin:0 25rpx;
					}
				}
			
				.share {
					background: #FC4541;
					box-shadow: 0px 8px 16px 0px rgba(225, 66, 66, 0.23);
				}
			
				.download {
					background: #1DD297;
					box-shadow: 0px 8px 9px 0px rgba(127, 254, 213, 0.35);
				}
			
			}
			
			.cancel-share{
				width:210rpx;
				display:flex;
				align-items:center;
				justify-content: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999896;
			}
		}

		

	}

	.mask {
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .18);
		z-index: 98;
	}



	.publishModal {
		background-color: white;
		border-radius: 30rpx 30rpx 0 0;
		width: 100%;
		height: 715rpx;
		z-index: 700;
		position: fixed;
		padding: 174rpx 55rpx 0;
		box-sizing: border-box;
		transition: 0.5s;
	}
</style>
