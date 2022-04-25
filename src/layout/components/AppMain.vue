<template>
  <section class="app-main">
    <router-view v-slot="{ Component }" :key="key">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => route.path)
</script>

<style scoped>
.app-main {
  /*50px = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  padding: 0;
  position: relative;
  overflow: hidden;
}
</style>
