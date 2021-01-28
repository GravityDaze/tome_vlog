import { http } from '@/utils/request.js'

// 刷新accesstoken
export const refreshAccessToken = data => http.get('/v/wxRefresh',{params:data}) 

// 登录
export const login = data => http.post('/v/wxLogin',data)

// 初始化参数
export const initParams = data =>http.get('/videoapp/init/param',data)

// 查询消息提示
export const queryMsgHit = data => http.get('/videoapp/me/getMyRead',data)