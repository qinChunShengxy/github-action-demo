<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="sidebar-menu"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variable.menuBg"
        :text-color="variable.menuText"
        :active-text-color="variable.menuActiveText"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Logo from './Logo.vue'
import { appStore } from '@/store/app'
import SidebarItem from './SidebarItem.vue'
import { settingsStore } from '@/store/settings'
import variables from '@/styles/variables.module.scss'

const app = appStore()
const settings = settingsStore()
const route = useRoute()
const router = useRouter()
const routes = computed(() => {
  return router.options.routes
})
const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const showLogo = computed(() => {
  return settings.sidebarLogo
})
const isCollapse = computed(() => {
  return !app.sidebar.opened
})
const variable = computed(() => {
  return variables
})
</script>

<style>
.sidebar-menu:not(.el-menu--collapse) {
  width: 210px;
}
</style>
