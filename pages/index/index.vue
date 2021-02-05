<template>
	<view class="index">
		<view class="bg">
			<image src="https://tomevideo.zhihuiquanyu.com/20210120142348.jpg" mode="aspectFill"></image>
		</view>
		<view class="logo">
			<image src="../../static/logo.png"></image>
			<text>Copyright ©2021 成都途咪智慧视频技术有限公司</text>
		</view>
	</view>
</template>

<script>
	import {
		initParams,
		login,
		queryMsgHit,
		refreshAccessToken
	} from '../../api/index.js'
	import { querySceneryInfo } from '../../api/shoot.js'
	import { parseQueryString } from '../../utils/parseQs.js'
	export default {
		onLoad(options) {
			// 对于二维码中携带了景区信息的 处理两种风格的二维码 
			if(options.sceneryId){
				// 小程序码
				this.id = options.sceneryId
				this.getSceneryInfo(this.id)
			}else if(options.q){
				// 普通二维码
				const q = decodeURIComponent(options.q)
				const params = parseQueryString(q)
				this.id = params.sceneryId
				this.getSceneryInfo(this.id)
			}
			
			
			this.handleRefreshToken()
		},
		data(){
			return{
				id:""
			}
		},
		methods: {
			async getSceneryInfo(id){
				const res = await querySceneryInfo({id})
				getApp().globalData.manual.lon = res.value.lon
				getApp().globalData.manual.lat = res.value.lat
				getApp().globalData.sceneryId = id
				getApp().globalData.sceneryName = res.value.name 
			},
			
			// 判断刷新Token还是重新登录
			handleRefreshToken() {
				// 查询缓存中是否有刷新用的缓存token
				const refreshToken = uni.getStorageSync("refresh_token");
				if (!refreshToken) {
					// 没有刷新token 获取授权数据以重新登录
					this.getAuthData()
				} else {
					// 有刷新token 将token刷新
					this.freshenToken(refreshToken)
				}
			},

			// 刷新accecctoken
			async freshenToken(refreshToken) {
				try {
					const res = await refreshAccessToken({
						refreshToken
					})
					// 缓存refresh_token
					uni.setStorageSync('refresh_token',res.value.refresh_token)
					// 缓存access_token
					uni.setStorageSync("access_token",res.value.access_token)
					// 获取初始化参数
					const params = await initParams()
					getApp().globalData.initParams = params.value
					// 查询用户的消息提示
					this.selectMsgHitFn()
					// 跳转
					this.transfer()
				} catch (err) {
					console.log(err)
					// 刷新失败时清除token
					uni.clearStorageSync()
					// 刷新失败 判断用户是否有授权,如有授权,仍然可以调用登录方法
					this.getAuthData()
				}
			},

			// 获取授权数据
			getAuthData() {
				// 判断用户是否授权
				uni.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							uni.getUserInfo({
								success: res => {
									// 获取用户信息成功
									uni.setStorageSync('userInfo', res.userInfo)
									// 登录
									this.loginFn()
								},
								fail: () => {
									this.transfer()
								}
							})
						} else {
							this.transfer()
						}
					}
				})
			},

			// 登录方法
			loginFn() {
				uni.login({
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
							// 登录成功，查询用户的消息提示
							this.selectMsgHitFn()
						} catch (err) {
							console.log(err)
						} finally{
							this.transfer()
						}
					},
					fail: () => {
						this.transfer()
					}
				})
			},

			// 获取初始化参数
			transfer() {
				if(this.id){
					uni.reLaunch({
						url: `/pages/shoot/shoot?id=${this.id}`
					})
				}else{
					uni.reLaunch({
						url: '/pages/home/home',
					})
				}
				
			},

			// 查询消息提示
			async selectMsgHitFn() {
				const res = await queryMsgHit()
				// if (res.hasMsg === 1) {
				//   wx.showTabBarRedDot({
				//     index: 2
				//   })
				// }
			},
		}
	}
</script>

<style lang="scss">
	.index {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.bg {
			flex: 1;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.logo {
			height: 160rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 235rpx;
				height: 60rpx;
				margin-bottom: 8rpx;
			}

			text {
				color: rgb(205, 205, 205);
				font-size: 20rpx;
			}
		}





	}
</style>
