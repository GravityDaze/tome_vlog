import { http } from '@/utils/request.js'

// 获取游记
export const queryTravel = data => http.get('/videoapp/me/queryMyVideos',{ params:data }) 

// 查询消息提示
export const queryMsg = () => http.get('/videoapp/me/getMyVideoNoReadNum')

//  查询已购视频
export const queryBuyList = () => http.post('/videoapp/video/queryBuyVideos',{})