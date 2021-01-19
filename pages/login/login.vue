<template>
	<view class="login">
		<button size="small" open-type="getUserInfo" type="default" @getuserinfo="getUserInfo">登录</button>
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
							uni.redirectTo({
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

<style lang="scss">
	.login {
		height: 100vh;
	}
</style>
