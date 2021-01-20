import { http } from '@/utils/request.js'

// 获取分享视频详细信息
export const queryShareVideoInfo = data => http.get('/videoapp/video/shareDetail',{params:data}) 

// 获取视频详细信息
export const queryVideoInfo = data => http.get('/videoapp/video/detail',{params:data}) 