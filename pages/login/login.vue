<template>
	<view class="login">
		<view class="login-bg">
			<image src="../../static/login.jpg"></image>
		</view>
		<view class="btn">
			<image src="../../static/wx.png"></image>
			<text>微信一键登录</text>
			<button style="position:absolute;top:0;bottom:0;width:100%;opacity:0" size="small" open-type="getUserInfo" type="default"
			 @getuserinfo="getUserInfo">登录</button>
		</view>
		<view class="tips">
			<text>请授权头像等信息，以便为您提供更好的服务</text>
		</view>
	</view>
</template>

<script>
	import {
		login,
		initParams
	} from "../../api/index.js"
	import {
		queryFace,
	} from '../../api/face.js'
	export default {
		data() {
			return {
				action: ''
			}
		},
		onLoad(options) {
			this.action = options.action
		},
		methods: {
			getUserInfo(e) {
				if (e.detail.userInfo) {
					uni.setStorageSync('userInfo', e.detail.userInfo)
					// 执行登录逻辑
					this.loginFn()
				}
			},
			loginFn() {
				uni.showLoading({
					title: '登录中',
					mask: true
				})
				wx.login({
					success: async ({
						code
					}) => {
						//发起网络请求
						try {
							const userInfo = uni.getStorageSync('userInfo')
							const res = await login({
								code,
								...userInfo
							})
							uni.setStorageSync('refresh_token', res.value.refresh_token)
							uni.setStorageSync('access_token', res.value.access_token)
							// 获取初始化参数
							const params = await initParams()
							getApp().globalData.initParams = params.value
							// 提示首页瀑布流刷新
							getApp().globalData.refreshWaterFall = true

							// 如果是从开拍页面登录 则需要检测是否录入了人脸
							if (this.action === 'shoot') {
								const face = await queryFace()
								// 不存在人脸则跳转到人脸
								if (!face.value.frontFace) {
									return uni.redirectTo({
										url: '/pages/face/face?actions=shoot'
									})
								}else{
									getApp().globalData.handler = 'start'
									return uni.navigateBack()
								}
							}
							
							
							// 如果存在全局返回路径
							const {
								returnPath
							} = getApp().globalData
							if (returnPath) {
								uni.redirectTo({
									url: returnPath,
									fail: _ => uni.switchTab({
										url: returnPath
									}),
									complete: _ => getApp().globalData.returnPath = ''
								})

							} else {
								uni.navigateBack()
							}

						} catch (err) {
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: '登陆失败'
							})
						} finally {
							uni.hideLoading()
						}
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '登陆失败'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		height: 100vh;
		background: #fff;
		padding-top: 50rpx;
		box-sizing: border-box;

		.login-bg {
			text-align: center;

			image {
				width: 496rpx;
				height: 422rpx;
			}
		}

		.btn {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 662rpx;
			height: 90rpx;
			background: linear-gradient(to right, #ffb90d, #ffd207);
			box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
			border-radius: 44rpx;
			margin: 0 auto;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			margin-top: 89rpx;

			image {
				width: 52rpx;
				height: 42rpx;
				margin-right: 12rpx;
			}
		}

		.tips {
			position: fixed;
			width: 100%;
			bottom: 47rpx;
			text-align: center;
			// left:50%;
			// transform:translateX(-50%);
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #707070;
		}

	}
</style>
