import { http } from '@/utils/request.js'

// 获取游记
export const queryTravel = data => http.get('/videoapp/me/queryMyVideos',{ params:data }) 

// 查询消息提示
export const queryMsg = () => http.get('/videoapp/me/getMyVideoNoReadNum')

//  查询已购视频
export const queryBuyList = () => http.post('/videoapp/video/queryBuyVideos',{})

//  查询打卡景区
export const queryMySceneryCount = () => http.get('/videoapp/me/queryMySceneryCount')

//  查询回复数量
export const queryCommentCount = () => http.get('/videoapp/me/queryCommentMsgCount')

//  查询点赞数量
export const queryLikeCount = () => http.get('/videoapp/me/queryLaudMsgCount')

// 修改购买视频的阅读状态为已读
export const updateBuyVideoStatus = data => http.post('/videoapp/me/updateVideoBuyReadStatus',data)

// 修改新视频的阅读状态为已读
export const updateNewVideoStatus = data => http.post('/videoapp/me/updateVideoNewReadStatus',data)

