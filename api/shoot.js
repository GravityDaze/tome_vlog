import { http } from '@/utils/request.js'

// 查询景区详情
export const querySceneryInfo = data => http.get('/videoapp/scenery/get',{ params:data } )