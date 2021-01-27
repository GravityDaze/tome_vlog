import { http } from '@/utils/request.js'

// 查询景区详情
export const querySceneryInfo = data => http.get('/videoapp/scenery/get',{ params:data } )

// 开启视频之旅
export const startTrip = data => http.post('/videoapp/video/startTrip',data )

// 是否开启视频之旅
export const isStartTrip = data => http.post('/videoapp/video/isStartTrip',data)