import { http } from '@/utils/request.js'

// 获取回复信息
export const queryComment = data => http.post('/videoapp/me/queryCommentMsg',data) 

// 获取点赞信息
export const queryLike = data => http.post('/videoapp/me/queryLaudMsg',data) 