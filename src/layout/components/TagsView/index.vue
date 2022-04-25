<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll" :tagList="tagList">
      <router-link
        v-for="tag in visitedViews"
        :ref="setTagRef"
        tag="span"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <el-icon
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script setup>
import path from 'path-browserify'
import { Close } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { tagsStore } from '@/store/tagsView'
import ScrollPane from './ScrollPane.vue'
import { ref, toRefs, reactive, computed, watch, onMounted, nextTick, onBeforeUpdate } from 'vue'

const scrollPane = ref(null)
const route = useRoute()
const router = useRouter()
const store = tagsStore()
const tagList = ref([])  //roter-link dom array
const data = reactive({
  top: 0,
  left: 0,
  visible: false,
  selectedTag: {},
  affixTags: []
})

const visitedViews = computed(() => {
  return store.visitedViews
})
const routes = computed(() => {
  return router.options.routes
})

watch(
  () => route.name,
  () => {
    // route是响应式数据,监听任何一个值都可以
    console.log('路由变化')
    addTags()
    moveToCurrentTag()
  }
)
watch(
  () => data.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

onMounted(() => {
  initTags()
  addTags()
})

onBeforeUpdate(()=> { //每次更新清空实例
  tagList.value = []
})

const setTagRef = (el)=> {
  if(el) tagList.value.push(el)
}
const isActive = (route) => {
  return route.path === route.path
}
const isAffix = (tag) => {
  return tag.meta && tag.meta.affix
}
const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  const affixTags = (data.affixTags = filterAffixTags(routes.value))
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      store.addVisitedView(tag)
    }
  }
}
const addTags = () => {
  const { name } = route
  if (name) {
    store.addView(route)
  }
  return false
}
const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of tagList.value) {
      if (tag.to.path === route.path) {
        scrollPane.value.moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          store.updateVisitedView(route)
        }
        break
      }
    }
  })
}
const refreshSelectedTag = (view) => {
  store.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: `/redirect${fullPath}`
      })
    })
  })
}
const closeSelectedTag = (view) => {
  store.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
const closeOthersTags = () => {
  router.push(data.selectedTag)
  store.delOthersViews(data.selectedTag).then(() => {
    moveToCurrentTag()
  })
}
const closeAllTags = (view) => {
  store.delAllViews().then(({ visitedViews }) => {
    if (data.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: `/redirect${view.fullPath}` })
    } else {
      router.push('/')
    }
  }
}
const openMenu = (tag, e) => {
  const menuMinWidth = 105
  const dom = document.querySelector('.tags-view-container').getBoundingClientRect()
  const offsetLeft = dom.left
  const offsetWidth = dom.width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    data.left = maxLeft
  } else {
    data.left = left
  }

  data.top = e.clientY
  data.visible = true
  data.selectedTag = tag
}
const closeMenu = () => {
  data.visible = false
}
const handleScroll = () => {
  closeMenu()
}

const { visible, top, left, selectedTag } = toRefs(data)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 25px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      vertical-align: middle;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: sub;
      border-radius: 50%;
      margin-left: 2px;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
      svg {
        transform: scale(0.8);
      }
    }
  }
}
</style>
