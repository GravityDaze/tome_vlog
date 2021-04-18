import { http } from '@/utils/request.js'

// 查询景区详情
export const querySceneryInfo = data => http.get('/videoapp/scenery/get',{ params:data } )

// 开启视频之旅
export const startTrip = data => http.post('/videoapp/video/startTrip',data )

// 是否开启视频之旅
export const hasStartTrip = data => http.post('/videoapp/video/isStartTrip',data)

// 查询打卡点
export const queryPointList = data => http.post('/videomis/point/query',data)

// 查询模板标签
export const queryTempTags = data => http.post('/videoapp/scenery/getTempletTags',{},{params:data})

// 查询模板
export const queryTemps = data => http.post('/videoapp/scenery/getTemplet',data)
