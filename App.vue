<script>
	import { refreshAccessToken, initParams } from 'api/index.js'
	export default {
		onLaunch: function() {
			// 更新信息
			const updateManager = wx.getUpdateManager()
			updateManager.onUpdateReady(function() {
				wx.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate()
						}
					}
				})
			})

			// 初始化判断是否刷新token
			const refreshToken = uni.getStorageSync("refresh_token")
			refreshToken ? this.getNewToken(refreshToken) : this.$isResolve()
		},
		methods: {
			async getNewToken(refreshToken) {
				try {
					const res = await refreshAccessToken({
						refreshToken
					})
					// 缓存refresh_token
					uni.setStorageSync('refresh_token', res.value.refresh_token)
					// 缓存access_token
					uni.setStorageSync("access_token", res.value.access_token)
					// 获取初始化参数
					const params = await initParams()
					getApp().globalData.initParams = params.value
					this.$isResolve()
				} catch (err) {
					console.log(err)
					// 刷新失败时清除token
					uni.clearStorageSync()
					this.$isResolve()
				}
			},
		},
		globalData: {
			initParams: {}, //初始化参数
			sceneryId: "", //用户当前所在的景区
			sceneryName: "", //用户当前所在景区名
			lon: '104.069568', // 用户当前定位的经纬度 默认麦田中心经纬度
			lat: '30.614207',
			manual: {}, // 在用户关闭位置授权或者未定位至景区时 用户手动定位的景区经纬度
			encryptKey: "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2NEfdniz2jQBzegrJsBTchXXrwZHjGqwZGbRWK3+rGjxHexKOT4ksaunrGy7qzZumN1s/I1v80HHTrh0BheKn0Fz7HMa2DQNnZTW4o7/uZzm9hd2C9Bh8QsIm5k8EgB/VEugXcil9ZCcs0UHh9K0nZds9XNZ6sFMwoijr8RjIfxKTyiXU3c4Hu5+EXp23I2imkgFvbxybZb2+ghoBkyRFMP+YzQIFvjIQSl0L3f4x11vb31ohIJhlNFYT3tyaPQD/LAxM21oObWf8Jgn5Nf3ygi6rAPSKT0alruQOmv43ANwkj3qZvBiOx3RpE1KmQubE7j5MOs8UqMZQsqDs8LSvAgMBAAECggEBALLI3Be/JNmMg/vLrhg3ulCkeJAsMW2J94LtsQG4zx5isPFm909DBhPamMuEseXeeLOBr/xlQtbw5jBSsc2TxVLrZsFUfDuYy1VCf5M8wpE5IvQwDap4wCn2C7LF3JVK73FRiwGumL2cb8BPWPlR8DIvhRBSL3bV29tl0wepXKsmNUCs6e8aor6wHSXK/mriih2v9udfIl0sbMkbS82IUFt2cMVyy2nNV1yY6d2v49S6D75sUyRtAW5gXl4K7QCwVxpGyum7yhaFwx0rDkXAVY6zVnhR+xcGchKJTOJMDc7Q3jOK88m5gj4r/HH4R1r7saIkLSp24BQ5/axTXiCZ6XECgYEA4ABsMBPckv0dIL54YO3Ko+eMsDn/kRSzImEghaPQdWJECsHqwkkULB+jT2dbmu1gEwfCYCJH/Z/jHHuDVzfGpz+DxO6eO2ho2ixDqFceOa7u78QxncYqJlICkjSpGmztI/FATgd1mnKDpjMatL7ZkWonRbQs0Qbebs7Wfyqqi+cCgYEA0DtbRkBwchytVCZeOJdTrU0+AsqiyMdzsFmYUkKSCHAQvWTQDYT79iThg9daulnrYrv/ISQF74njHTvJ0uDg53+MnV6WFe7dbVYLSI3jKGQ7H60/jAroTj4ffVYcCgjQOirXXhNBZrMyKeYw4rZ8Z0oK0gQ2MHzPQCyGas8AN/kCgYATMRYT3G/GjDclqgwISfdVqa4NHzr9RCfA509xA8MFe6DWxxyE/tvil+dXE0Tu9i2IE98ce3NtkHhV5WMwYs/7Xl68zbDy6BQrtSUq1CP7zzgbhNS3btYHqHkd67MdV33N2Yqn5M23qN4MrE46dCuR4OVyfGhmlE8UcVZBWPd5uwKBgBafXDs1pQHAu9P4lyPuzNh3G9WRzj2h7Z+rHDFTqinggvEQksnlOLp1J0r7io/UVQ5U/lLLZxmvEU2LwVF3vPdplA1EyWl4mfXW80Lep18sBIBcghrk1Hgrp6AmSsWMT5MCNIOz89cEgN6sc4Mt8DYIhURr0LdT1/BQ5gmUk6GBAoGBALFX7R8Juoz0kdOntwiJpQZycut0yE1azW+FfERB6JXFYVC3L08c+lf4rYyG4BOFefk3wTsTP5v7NQgBAOQZAt7NOFa8TKf9b2R4x+PvW15uEGIJWUlueVX36+lPOTkBatNfetyDUyQgk+JiTb06dLQZT+wFQM8Mq3MSn5xytpA6"
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		/* background-color: #FCFCFC; */

	}
</style>
