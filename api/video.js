import { http } from '@/utils/request.js'

// 获取分享视频详细信息
export const queryShareVideoInfo = data => http.get('/videoapp/video/shareDetail',{params:data}) 

// 获取视频详细信息
export const queryVideoInfo = data => http.get('/videoapp/video/detail',{params:data}) 

// 用户发布视频
export const share = data => http.post('/videoapp/video/share',data)

// 用户取消发布
export const cancelShare = data => http.get('/videoapp/video/shareCancel',{params:data})

// 获取小程序页面分享码
export const getQrCode = data => http.post('/videoapp/qr/shareQr',data)