<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { computed, markRaw } from 'vue'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
const hasExternal = computed(() => {
  return isExternal(props.to)
})
const type = markRaw(computed(() => {
  if (hasExternal.value) {
    return 'a'
  }
  return 'router-link'
}))
const linkProps = (to) => {
  if (hasExternal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return { to }
}
</script>
