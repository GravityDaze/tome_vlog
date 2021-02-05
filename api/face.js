import { http } from '@/utils/request.js'

// 获取用户人脸信息
export const queryFace = () => http.get('/videoapp/me/getFace')

// 编辑用户人脸信息
export const editFace = data => http.post('/videoapp/me/editFace',data)

// 获取七牛云token
export const get7nToken = () => http.get('/videoapp/upload/faceAuth')

// 人脸检测接口
export const checkFace = data => http.post('/videoapp/me/checkFace',data)