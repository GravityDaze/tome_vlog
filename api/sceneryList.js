import { http } from '@/utils/request.js'

// 获取周边景区
export const queryNearby = data => http.post('/videoapp/scenery/queryByDistance',data) 