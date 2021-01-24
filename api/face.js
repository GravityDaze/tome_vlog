import { http } from '@/utils/request.js'

// 获取用户人脸信息
export const queryFace = () => http.get('/videoapp/me/getFace')

// 编辑用户人脸信息
export const editFace = data => http.post('/videoapp/me/editFace',data)
