import { defineStore } from 'pinia'

export const tagsStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: [],
      cachedViews: []
    }
  },
  getters: {
    // getters类似于组件的计算属性computed，有缓存的功能
    // getters只接受一个可选参数：state状态对象
    // 箭头函数参数为state，普通函数，直接使用this进行修改state中的数据
    ADD_VISITED_VIEW() {
      return (view) => {
        // getter 返回一个函数,这个函数用来接收参数
        if (this.visitedViews.some((v) => v.path === view.path)) return
        this.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta.title || 'no-name'
          })
        )
      }
    },
    ADD_CACHED_VIEW() {
      return (view) => {
        if (this.cachedViews.includes(view.name)) return
        if (!view.meta.noCache) {
          this.cachedViews.push(view.name)
        }
      }
    },

    DEL_VISITED_VIEW(state) {
      return (view) => {
        for (const [i, v] of state.visitedViews.entries()) {
          if (v.path === view.path) {
            state.visitedViews.splice(i, 1)
            break
          }
        }
      }
    },
    DEL_CACHED_VIEW(state) {
      return (view) => {
        const index = state.cachedViews.indexOf(view.name)
        index > -1 && state.cachedViews.splice(index, 1)
      }
    },

    DEL_OTHERS_VISITED_VIEWS(state) {
      return (view) => {
        state.visitedViews = state.visitedViews.filter((v) => {
          return v.meta.affix || v.path === view.path
        })
      }
    },
    DEL_OTHERS_CACHED_VIEWS(state) {
      return (view) => {
        const index = state.cachedViews.indexOf(view.name)
        if (index > -1) {
          state.cachedViews = state.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          state.cachedViews = []
        }
      }
    },

    DEL_ALL_VISITED_VIEWS: (state) => {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag) => tag.meta.affix)
      state.visitedViews = affixTags
    },

    UPDATE_VISITED_VIEW(state) {
      return (view) => {
        for (let v of state.visitedViews) {
          if (v.path === view.path) {
            v = Object.assign(v, view)
            break
          }
        }
      }
    }
  },
  actions: {
    addView(view) {
      //只能写普通函数，通过this进行修改state中的数据，不能写箭头函数，this会丢失
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view) {
      this.ADD_VISITED_VIEW(view)
    },
    addCachedView(view) {
      this.ADD_CACHED_VIEW(view)
    },

    delView(view) {
      return new Promise((resolve) => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delVisitedView(view) {
      return new Promise((resolve) => {
        this.DEL_VISITED_VIEW(view)
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view) {
      return new Promise((resolve) => {
        this.DEL_CACHED_VIEW(view)
        resolve([...this.cachedViews])
      })
    },

    delOthersViews(view) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersVisitedViews(view) {
      return new Promise((resolve) => {
        this.DEL_OTHERS_VISITED_VIEWS(view)
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view) {
      return new Promise((resolve) => {
        this.DEL_OTHERS_CACHED_VIEWS(view)
        resolve([...this.cachedViews])
      })
    },

    delAllViews(view) {
      return new Promise((resolve) => {
        this.delAllVisitedViews(view)
        this.delAllCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        this.DEL_ALL_VISITED_VIEWS()
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },

    updateVisitedView(view) {
      this.UPDATE_VISITED_VIEW(view)
    }
  }
})
