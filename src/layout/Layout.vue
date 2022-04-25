<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppMain, Navbar, Sidebar, TagsView } from './components'

const fixedHeader = ref(false)
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

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
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

.mobile .fixed-header {
  width: 100%;
}
</style>
