<template>
	<!-- 分享弹框 -->
	<view :class="{'shareModal':true,'out':!show}">
		<view class="text">
			<text>立即分享给好友</text>
		</view>
		<view class="item-box">
			<view class="item">
				<button style="position:absolute;top:0;bottom:0;width:100%;opacity:0" open-type="share"></button>
				<image src="../../../static/wxicon.png"></image>
				<text>微信好友</text>
			</view>

			<view class="item" @click="shareToMoments">
				<image src="../../../static/pyq.png"></image>
				<text>朋友圈</text>
			</view>

			<view class="item" @click="showPublishModal = true" v-if="videoInfo.shareStatus === 0">
				<image src="../../../static/zbicon.png"></image>
				<text class="publish">发布至途咪</text>
			</view>
		</view>

		<view class="btn" @click="cancel">
			<text>取消</text>
		</view>

		<!-- 发布至途咪 -->
		<view :class="{'publishModal':true,'out':!showPublishModal }">
			<view class="cover">
				<image :src="videoInfo.coverUrl"></image>
			</view>
			<view class="tips">
				<text>发布至途咪平台后，视频可公开评论和点赞</text>
			</view>
			<view class="input-box">
				<text>游记说明</text>
				<input v-model="describe" maxlength="30" type='text' placeholder-class="placeholder" placeholder='请输入（必填,最大输入长度为30）' />
			</view>
			<view class="publish-btn" @click="shareToTome">
				<text>立即发布</text>
			</view>
			<view class="cancel-publish" @click="showPublishModal = false">
				<text>暂不发布</text>
			</view>
		</view>

		<!-- 朋友圈分享码 -->
		<view class="qr-code" v-if="false">
			<image src="../../../static/whitebg.png"></image>
			<view class="content-box">
				<view class="pic-box">
					<image></image>
				</view>
				<view class="save">
					<text>保存到相册，可以分享到朋友圈</text>
				</view>
				<view class="btn">
					<view>取消</view>
					<view>保存</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		share,
		getQrCode
	} from '../../../api/video.js'
	export default {
		props: {
			show: {
				default: false,
				type: Boolean
			},
			videoInfo: {
				default: {},
				type: Object
			}
		},
		data() {
			return {
				describe: "",
				showPublishModal: false
			}
		},
		watch: {
			show(val) {
				if (!val) {
					this.showPublishModal = false
				}
			}
		},
		methods: {
			cancel() {
				this.$emit('close')
			},
			// 分享到途咪
			async shareToTome() {
				// emoji正则
				const reg =
					/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig

				// 校验是否为空
				if (this.describe === "") {
					return uni.showToast({
						title: '请输入说明',
						icon: 'none',
						mask: true,
					})

					// 过滤emoji
				} else if (reg.test(this.describe)) {
					return uni.showToast({
						title: '暂不支持emoji',
						icon: 'none',
						mask: true
					})
				}



				uni.showLoading({
					title: '发布中',
					mask: true
				})
				try {
					const res = await share({
						id: this.videoInfo.id,
						describe: this.describe
					})

					uni.showModal({
						title:"发布成功",
						content:"快去首页看看吧",
						success:res=>{
							if(res.confirm){
								uni.switchTab({
									url:'/pages/home/home'
								})
							}
						}
					})
					this.describe = ""
					this.$emit('close')
					this.$emit('publish-success')
				} catch (err) {
					uni.showModal({
						content: err.toString()
					})
				} finally{
					uni.hideLoading()
				}
			},
			// 分享朋友圈
			async shareToMoments() {
				uni.showToast({
					title: '暂未开放',
					icon: 'none'
				})
				// uni.showLoading({
				// 	title: '加载中',
				// 	mask: true
				// })

				// // 生成不同类型的二维码
				// let scene
				// let pagePath
				// if (this.videoInfo.shareStatus === 0) {
				// 	// 未发布
				// 	pagePath = "pages/myVideo/myVideo";
				// 	scene = this.videoInfo.id;
				// } else {
				// 	// 已发布
				// 	pagePath = "pages/shareVideo/shareVideo";
				// 	scene = "videoShareId=" + this.videoInfo.videoShareId;
				// }
				
				// try{
				// 	const res = await getQrCode({
				// 		pagePath,
				// 		scene
				// 	})
				// }catch(err){
				// 	uni.showModal({
				// 		content:'朋友圈分享功能暂未开放',
				// 		success
				// 	})
				// }finally{
				// 	uni.hideLoading()
				// }
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 过渡类名
	.out {
		bottom: -100% !important;
	}

	.shareModal {
		position: fixed;
		padding-bottom:env(safe-area-inset-bottom);
		bottom: 0;
		z-index: 99;
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-flow: column;
		transition: .3s;
		border-radius:27rpx 27rpx 0 0;
		
		.text{
			text-align: center;
			font-size:26rpx;
			color:#414141;
			padding-top:44rpx;
		}

		.item-box {
			display: flex;
			height: 245rpx;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-around;
			border-bottom: 15rpx solid #f7f7f7;

			.item {
				position: relative;
				display: flex;
				flex-flow: column;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #7c7c7c;
				flex: 1;


				image {
					width: 78rpx;
					height: 78rpx;
					margin-bottom: 17rpx;
				}

			}

		}

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			height:90rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #2f2f2f;
		}



		.publishModal {
			position: fixed;
			border-radius: 30rpx 30rpx 0 0;
			width: 100%;
			z-index: 700;
			background-color: white;
			padding: 174rpx 55rpx 0;
			box-sizing: border-box;
			transition: 0.5s;
			bottom: 0;
			transition: 0.3s;
			padding-bottom:calc( env(safe-area-inset-bottom) + 41rpx) ;

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

				text {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(51, 51, 50, 1);
				}

				input {
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

		.qr-code {
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 600;
			background: #fff;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			&>image {
				width: 100%;
				height: 100%;
			}

			.content-box {
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;


				.pic-box {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 350rpx;
						height: 350rpx;
					}
				}

				.save {
					margin-top: 40rpx;

					text {
						font-size: 30rpx;
						font-family: San Francisco Display;
						color: rgba(153, 152, 150, 1);
					}
				}

				.btn {
					display: flex;
					flex-wrap: nowrap;
					flex-direction: row;
					margin-top: 60rpx;

					view {
						border-radius: 40rpx;
						width: 200rpx;
						height: 78rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 30rpx;
						font-weight: 400;

						&:first-child {
							border: 1px solid rgba(252, 69, 65, 1);
							background-color: rgba(252, 69, 65, 1);
							color: #000;
						}

						&:last-child {
							border: 1px solid rgba(29, 210, 151, 1);
							background-color: rgba(29, 210, 151, 1);
							color: white;
							margin-left: 50rpx;

						}
					}
				}

			}

		}


		// .anishow {
		// 	transition: .3s;
		// 	overflow: hidden;
		// 	width: 596rpx;
		// 	height: 724rpx;
		// 	opacity: 1;
		// }

		// .anihide {
		// 	transition: .3s;
		// 	overflow: hidden;
		// 	width: 0;
		// 	height: 0;
		// 	opacity: 0;
		// }





















	}
</style>
