import { http } from '@/utils/request.js'

// 获取游记
export const queryTravel = data => http.get('/videoapp/me/queryMyVideos',{ params:data }) 
