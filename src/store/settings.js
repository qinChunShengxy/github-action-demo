import { defineStore } from 'pinia'

export const settingsStore = defineStore('settings', {
  state: () => ({
    showSettings: config.showSettings,
    tagsView: config.tagsView,
    fixedHeader: config.fixedHeader,
    sidebarLogo: config.sidebarLogo
  }),
  getters: {
    CHANGE_SETTING(state) {
      return ({ key, value }) => {
        if (state.hasOwnProperty(key)) {
          state[key] = value
        }
      }
    }
  },
  actions: {
    changeSetting(data) {
      this.CHANGE_SETTING(data)
    }
  }
})
