import { defineStore } from 'pinia'

const appStore = defineStore('app', {
  state() {
    return {
      msg: 'hello pania!',
      count: 0
    }
  },
  getters: {
    getCount(state) {
      console.log('getter被调用')
      return `${state.msg} ---- ${state.count}`
    }
  },
  actions: {
    changeState() {
      this.count++
    }
  }
})
