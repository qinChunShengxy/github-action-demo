import axios from 'axios'
import { userStore } from '@/store/user'
import { getToken } from '@/utils/auth'
import { ElMessage, ElMessageBox } from 'element-plus'

// 使用apifox 模拟接口数据
const service = axios.create({
  // baseURL: `http://${config.SERVERIP}:${config.SERVERPORT}/mock/1059268`,
  baseURL: '',
  timeout: 60000
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    // config.headers.authorization = 'Bearer vue3-admin'
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.code === 403) {
      ElMessageBox.confirm('登录用户会话过期,请重新登录!', '提示', {
        closeOnPressEscape: false,
        closeOnClickModal: false,
        showClose: false,
        showCancelButton: false,
        confirmButtonText: '重新登录',
        type: 'warning'
      }).then(() => {
        userStore().logout().then(()=> {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject(new Error('error'))
    }
    return response
  },
  (error) => {
    ElMessage({
      message: '网络请求超时——' + error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
