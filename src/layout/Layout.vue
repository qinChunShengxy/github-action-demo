<template>
  <div :class="['app-wrapper', classObj]">
    <sidebar class="sidebar-container" />
    <div :class="['main-container', { hasTagsView: setting.tagsView }]">
      <div :class="{ 'fixed-header': setting.fixedHeader }">
        <navbar />
        <tags-view v-if="setting.tagsView" />
      </div>
      <app-main />
      <right-panel v-if="setting.showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { appStore } from '@/store/app'
import { settingsStore } from '@/store/settings'
import RightPanel from '@/components/RightPanel/index.vue'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'

const isCollapse = ref(true)
const app = appStore()
const setting = settingsStore()

const classObj = computed(() => {
  return {
    hideSidebar: !app.sidebar.opened,
    openSidebar: app.sidebar.opened
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .main-container {
    min-height: 100%;
    position: relative;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
</style>
