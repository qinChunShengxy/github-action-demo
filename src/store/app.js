import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
    }
  }),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    closeSideBar() {
      Cookies.set('sidebarStatus', 0)
      this.sidebar.opened = false
    }
  }
})
