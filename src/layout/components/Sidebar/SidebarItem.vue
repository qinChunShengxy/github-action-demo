<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item, item.children) &&
        (!obj.onlyOneChild.children || obj.onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <!-- <app-link v-if="obj.onlyOneChild.meta" :to="resolvePath(obj.onlyOneChild.path)"> -->
        <el-menu-item v-if="obj.onlyOneChild.meta" :index="resolvePath(obj.onlyOneChild.path)">
          <svg-icon v-if="obj.onlyOneChild.meta.icon" :icon-class="obj.onlyOneChild.meta.icon" />
          <!-- <el-icon><icon-menu /></el-icon> -->
          <template #title>{{ obj.onlyOneChild.meta.title }}</template>
        </el-menu-item>
      <!-- </app-link> -->
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title v-if="item.meta">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" />
        <!-- <el-icon><icon-menu /></el-icon> -->
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import path from 'path-browserify'
import { reactive } from 'vue'
import AppLink from './Link.vue'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})
const obj = reactive({
  onlyOneChild: null
})
const hasOneShowingChild = (parent, children = []) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    }
    // Temp set(will be used if only has one showing child)
    obj.onlyOneChild = item
    return true
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    obj.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
