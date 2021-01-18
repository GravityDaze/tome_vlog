import { http } from '@/utils/request.js'

// 获取周边景区
export const queryVideoInfo = data => http.get('/videoapp/video/shareDetail',{params:data}) 