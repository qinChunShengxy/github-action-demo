<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { tagsStore } from '@/store/tagsView'

const route = useRoute()
const store = tagsStore()
const cachedViews = computed(() => {
  return store.cachedViews
})
const key = computed(() => route.path)
</script>

<style lang="scss" scoped>
.app-main {
  /*50px = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
