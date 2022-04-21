import axios from 'axios'
import { ElMessage } from 'element-plus'

const server = axios.create({
  baseURL: '',
  timeout: 60000
})

server.interceptors.request.use(
  (res) => {
    const config = res
    const token = 'abc'
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

server.interceptors.response.use(
  (response) => {
    if (response.data.code === 403) {
      ElMessage.error('登录用户会话过期,请重新登录!')
    }
    return response
  },
  (error) => {
    ElMessage.error(error)
    return Promise.reject(error)
  }
)

export default server
