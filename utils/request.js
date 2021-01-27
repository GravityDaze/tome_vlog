import Request from '@/libs/luch-request/index.js'
export const http = new Request()
// 全局配置
http.setConfig(config => {
	config.baseURL = 'https://tome3pay.zhihuiquanyu.com',
	config.timeout = 10000
	return config
})

// 请求拦截器
http.interceptors.request.use((config, cancel) => {
	const token = uni.getStorageSync('access_token')
	// 如果有token,则每次请求都带token
	if(token){
		config.header = {
			"Authorization": `Bearer ${token}`
		}
	}
	
	return config
})

// 响应拦截器
http.interceptors.response.use(res => {
	const {
		resultCode
	} = res.data.resultStatus
	// 请求成功
	if (resultCode === '0000') {
		return res.data
	} else {
		return Promise.reject(res.data.resultStatus)
	}
}, err => {
	const {
		resultCode
	} = err.data.resultStatus
	if (resultCode === '0007') {
		console.log('登录失效')
		uni.clearStorageSync()
	} else {
		return Promise.reject(err.data.resultStatus)
	}
})
