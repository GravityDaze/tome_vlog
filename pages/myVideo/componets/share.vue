<template>
	<!-- 分享选择弹框 -->

	<view>
		<uni-popup ref="popup" type="bottom" @change="e=>!e.show && $emit('close')">
			<view class="shareModal">
				<view class="text">
					<text>立即分享给好友</text>
				</view>
				<view class="item-box">
					<view class="item">
						<button style="position:absolute;top:0;bottom:0;width:100%;opacity:0"
							open-type="share"></button>
						<image src="../../../static/wxicon.png"></image>
						<text>微信好友</text>
					</view>

					<view class="item" @click="shareToMoments">
						<image src="../../../static/pyq.png"></image>
						<text>朋友圈</text>
					</view>

					<view class="item" @click="$refs.toTome.open()" v-if="videoInfo.shareStatus === 0">
						<image src="../../../static/zbicon.png"></image>
						<text class="publish">发布至途咪</text>
					</view>
				</view>

				<view class="btn" @click="$refs.popup.close()">
					<text>取消</text>
				</view>
			</view>
		</uni-popup>

		<!-- 发布至途咪 -->
		<uni-popup ref="toTome" type="bottom">
			<view class="publishModal">
				<view class="cover">
					<image :src="videoInfo.coverUrl"></image>
				</view>
				<view class="tips">
					<text>发布至途咪平台后，视频可公开评论和点赞</text>
				</view>
				<view class="input-box">
					<text>游记说明</text>
					<input v-model="describe" maxlength="30" type='text' placeholder-class="placeholder"
						placeholder='请输入（必填,最大输入长度为30）' />
				</view>
				<view class="publish-btn" @click="shareToTome">
					<text>立即发布</text>
				</view>
				<view class="cancel-publish" @click="$refs.toTome.close()">
					<text>暂不发布</text>
				</view>
			</view>
		</uni-popup>

		<!-- 朋友圈分享码 -->
		<uni-popup ref="moment" type="center">
			<view class="qr-code">
				<view class="content-box">
					<view class="pic-box">
						<image :src="qr"></image>
					</view>
					<view class="save">
						<text>保存到相册，可以分享到朋友圈</text>
					</view>
					<view class="btn">
						<view @click=" $refs.moment.close() ">取消</view>
						<view @click="saveImg">保存</view>
					</view>
				</view>
			</view>
		</uni-popup>


	</view>
</template>

<script>
	import {
		share,
		getQrCode
	} from '../../../api/video.js'
	export default {
		props: {
			videoInfo: {
				default: {},
				type: Object
			},
			shareModalVisual: {
				default: false
			}
		},
		data() {
			return {
				describe: "",
				qr: "",
				showQrShare: false
			}
		},
		watch: {
			shareModalVisual(val) {
				val && this.$refs.popup.open()
			}
		},
		methods: {
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
						title: "发布成功",
						content: "快去首页看看吧",
						success: res => {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/home/home'
								})
							}
						}
					})
					this.describe = ""
					this.popup.close()
					this.$refs.toTome.close()
					this.$emit('publish-success')
				} catch (err) {
					uni.showModal({
						content: err.toString()
					})
				} finally {
					uni.hideLoading()
				}
			},
			// 分享朋友圈
			async shareToMoments() {
				console.log(this.videoInfo  )
				this.$refs.moment.open()
				// // 生成不同类型的二维码
				let scene
				let pagePath
				if (this.videoInfo.shareStatus === 0) {
					// 未发布
					pagePath = "pages/myVideo/myVideo";
					scene = this.videoInfo.id;
				} else {
					// 已发布
					pagePath = "pages/shareVideo/shareVideo";
					scene = this.videoInfo.videoShareId;
				}

				try {
					const res = await getQrCode({
						pagePath,
						scene
					})
					this.qr = res.value
				} catch (err) {
					uni.showModal({
						content: '朋友圈分享功能暂未开放'
					})
				}
			},

			saveImg() {
				// 下载图片
				uni.getSetting({
					success: res => {
						if (res.authSetting['scope.writePhotosAlbum'] === false) {
							wx.showModal({
								content: '检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？',
								success(res) {
									if (res.confirm) {
										uni.openSetting()
									}
								}
							})
						} else {
							// 执行下载方法
							const downloadTask = uni.downloadFile({
								url:this.qr,
								success: res => {
									if (res.statusCode === 200) {
										this.saveToAlbum(res.tempFilePath)
									} else {
										uni.showToast({
											title: '下载出错',
											icon: 'none'
										})
									}
								}
							})
						}
					},
				})
			},

			// 保存至相册
			saveToAlbum(filePath) {
				uni.saveImageToPhotosAlbum({
					filePath,
					success: res => {
						// 保存下载目录
						uni.showToast({
							title: '已保存至相册',
							icon: 'success',
							duration: 2000
						})
					},
					fail: _ => {
						uni.showModal({
							content: '检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？',
							success(res) {
								if (res.confirm) {
									uni.openSetting()
								} else {
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									})
								}
							}
						})
						uni.hideLoading()
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.shareModal {
		padding-bottom: env(safe-area-inset-bottom);
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-flow: column;
		border-radius: 27rpx 27rpx 0 0;

		.text {
			text-align: center;
			font-size: 26rpx;
			color: #414141;
			padding-top: 44rpx;
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
			height: 90rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #2f2f2f;
		}


	}

	// 分享至途咪
	.publishModal {
		border-radius: 30rpx 30rpx 0 0;
		width: 100%;
		background-color: white;
		padding: 174rpx 55rpx 0;
		box-sizing: border-box;
		padding-bottom: calc(env(safe-area-inset-bottom) + 41rpx);

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

	// 分享至朋友圈
	.qr-code {
		display: flex;
		justify-content: center;
		align-items: center;
		background: url(../../../static/whitebg.png) no-repeat center;
		background-size: contain;
		padding: 75rpx;

		.content-box {
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
</style>
