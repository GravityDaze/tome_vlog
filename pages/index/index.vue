<template>
	<view class="index">
		<view class="bg">
			<image src="../../static/bg.jpg"  mode="aspectFill"></image>
		</view>
		<view class="logo">
			<image src="../../static/logo.png"></image>
			<text>Copyright ©2021 Tome Vlog</text>
		</view>
	</view>
</template>

<script>
	import { initParams,login,queryMsgHit,refreshAccessToken } from '../../api/index.js'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.autoMakefn()
		},
		methods: {
			  // 判断刷新Token还是重新登录
			  autoMakefn() {
			    // 查询缓存中是否有刷新用的缓存token
			    const refreshToken = wx.getStorageSync("refresh_token") || "";				
			    if (!refreshToken) {
			      // 没有刷新token 获取授权数据以重新登录
			      this.getAuthData()
			    } else {
			      // 有刷新token 将access刷新
			      this.freshenToken(refreshToken)
			    }
			  },
			
			  // 刷新accecctoken
			  async freshenToken(refreshToken) {
			    try {
			      const res = await refreshAccessToken({
			        refreshToken
			      })
				  console.log(res)
			      // 缓存refresh_token
			      wx.setStorageSync(
			        'refresh_token',
			        res.value.refresh_token,
			      )
			      // 缓存access_token
			      wx.setStorageSync(
			        "access_token",
			        res.value.access_token,
			      )
			      // 获取初始化参数
			      this.initParamFn()
			      //  查询用户的消息提示
			      this.selectMsgHitFn()
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
			    wx.getSetting({
			      success: res => {
			        if (res.authSetting['scope.userInfo']) {
			          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
			          wx.getUserInfo({
			            success: res => {
			              console.log(res)
			              // 获取用户信息成功
			              const userInfo = res.userInfo
			              getApp().globalData.userInfo = userInfo;
			              // 用户头像URL
			              wx.setStorageSync('headUrl', userInfo.avatarUrl)
			              // 用户昵称
			              wx.setStorageSync('nickName', userInfo.nickName)
			              // 用户性别
			              wx.setStorageSync('gender', userInfo.gender)
			              // 用户所在国家
			              wx.setStorageSync('country', userInfo.country)
			              // 用户所在省
			              wx.setStorageSync('province', userInfo.province)
			              // 用户所在城市
			              wx.setStorageSync('city', userInfo.city)
			              wx.setStorageSync('iv', res.iv)
			              // 登录
			              this.loginFn()
			            },
			            fail: () => {
			              // 获取用户信息失败
			              this.initParamFn()
			            }
			          })
			        } else {
			          // 用户未授权
			          this.initParamFn()
			        }
			      }
			    })
			  },
			
			  // 登录方法
			  loginFn() {
			    wx.login({
			      success: async ({
			        code
			      }) => {
			        //发起网络请求
			        try {
			          const res = await login({
			            code,
			            nickName: getApp().globalData.userInfo.nickName,
			            avatarUrl: getApp().globalData.userInfo.avatarUrl,
			            gender: getApp().globalData.userInfo.gender,
			            country: getApp().globalData.userInfo.country,
			            province: getApp().globalData.userInfo.province,
			            city: getApp().globalData.userInfo.city
			          })
			          wx.setStorageSync('refresh_token', res.value.refresh_token)
			          wx.setStorageSync('access_token', res.value.access_token)
			          this.initParamFn()
			          // 登录成功，查询用户的消息提示
			          this.selectMsgHitFn()
			        } catch (err) {
			          this.initParamFn()
			        }
			      },
			      fail: () => {
			        this.initParamFn()
			      }
			    })
			  },
			
			  // 获取初始化参数
			   initParamFn() {
			//     try {
			//       const res = await initParams()
			//       getApp().globalData.noBuyVideoLook = res.value.noBuyVideoLook / 100
			//       getApp().globalData.uploadVideoMaxSize = res.value.uploadVideoMaxSize
			//       getApp().globalData.uploadVideoDuration = res.value.uploadVideoDuration
			//       getApp().globalData.uploadVideoMaxNum = res.value.uploadVideoMaxNum
			//       getApp().globalData.composeSuccessSubscribeTmplId = res.value.composeSuccessSubscribeTmplId
			
			//         setTimeout( _=>{
			//           if (this.data.options.type === 2) {
			//             wx.reLaunch({
			//               url: '/pages/mine/mine',
			//             })
			//           } else {
				console.log('here')
			            uni.reLaunch({
			              url: '/pages/home/home',
			            })
			          // }
			        // },300 )
			
			//     } catch (err) {
			// 		console.log(err)
			//       wx.showToast({
				
				
				
				
				
			//         title: '初始化失败',
			//         icon: 'none',
			//         duration: 2000,
			//         mask: true
			//       })
			//     }
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
	.index{
		height:100vh;
		display:flex;
		flex-direction: column;
		
		.bg{
			flex:1;
			
			image{
				height:100%;
				width:100%;
			}
		}
		
		.logo{
			height:160rpx;
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			image{
				width:235rpx;
				height:60rpx;
				margin-bottom:8rpx;
			}
			
			text{
				color:rgb(205,205,205);
				font-size:20rpx;
			}
		}
		
		
		
		
		
	}
</style>
