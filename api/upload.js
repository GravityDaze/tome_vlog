import { http } from '@/utils/request.js'

// 查询用户已上传的视频
export const queryUpload = data => http.get('/videoapp/madeVideo/query',{params:data}) 

// 提交用户定制视频信息
export const submit = data => http.post('/videoapp/madeVideo/submit',data)

// 获取七牛云token
export const get7nToken = () => http.get('/videoapp/upload/madeVideoAuth')