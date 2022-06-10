import { login } from '@/api/login'
import { removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    userData: null
  }),
  actions: {
    userLogin(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response
            console.log(data)
            this.userData = data.msg
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        removeToken()
        resolve()
      })
    }
  }
})
