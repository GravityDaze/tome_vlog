import { http } from '@/utils/request.js'

// 获取banner视频
export const queryBannerList = () => http.get('/videoapp/video/top')

// 获取热门景区
export const queryHotScenery = data => http.post('/videoapp/scenery/hot',data)

// 获取精彩瞬间
export const queryMoment = data => http.post('/videoapp/video/goodMoment',data)