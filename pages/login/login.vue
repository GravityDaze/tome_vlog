<template>
	<view class="login">
		<view class="login-bg">
			<image src="../../static/login.jpg"></image>
		</view>
		<view class="btn">
			<image src="../../static/wx.png"></image>
			<text>微信一键登录</text>
			<button style="position:absolute;top:0;bottom:0;width:100%;opacity:0" size="small" open-type="getUserInfo" type="default" @getuserinfo="getUserInfo">登录</button>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from "../../api/index.js"
	export default {
		data() {
			return {

			}
		},
		methods: {
			getUserInfo(e) {
				if (e.detail.userInfo) {
					uni.setStorageSync('userInfo',JSON.stringify(e.detail.userInfo))
					// 执行登录逻辑
					this.loginFn()
				}
			},
			loginFn() {
				wx.login({
					success: async ({
						code
					}) => {
						//发起网络请求
						try {
							const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
							const res = await login({
								code,
								...userInfo
							})
							uni.setStorageSync('refresh_token', res.value.refresh_token)
							uni.setStorageSync('access_token', res.value.access_token)
							// 登录成功跳转回'我的页面'
							uni.switchTab({
								url: '/pages/mine/mine'
							})

						} catch (err) {
							uni.showToast({
								icon: 'none',
								title: '登陆失败'
							})
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
		background:#fff;
		padding-top:50rpx;
		box-sizing:border-box;
		
		.login-bg{
			text-align: center;
			
			image{
				width: 496rpx;
				height: 422rpx;
			}
		}
		
		.btn{
			position:relative;
			display:flex;
			align-items:center;
			justify-content: center;
			width: 662rpx;
			height: 90rpx;
			background:linear-gradient(to right,#ffb90d,#ffd207);
			box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
			border-radius: 44rpx;
			margin:0 auto;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			margin-top:89rpx;
			
			image{
				width: 52rpx;
				height: 42rpx;
				margin-right:12rpx;
			}
		}
			
	}
</style>
