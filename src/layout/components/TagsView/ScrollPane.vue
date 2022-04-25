<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  tagList: {
    type: Array,
    default: ()=> []
  }
})
const emit = defineEmits('scroll')
const tagAndTagSpacing = 4 // tagAndTagSpacing

const scrollContainer = ref(null)
const scrollWrapper = computed(() => {
  return scrollContainer.value.$refs.wrap$
})
onMounted(() => {
   scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})
const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  scrollWrapper.value.scrollLeft += eventDelta / 4
}
const emitScroll = () => {
  emit('scroll')
}
const moveToTarget = (currentTag) => {
  const $container = scrollContainer.value.$el
  const $containerWidth = $container.offsetWidth

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (props.tagList.length > 0) {
    ;[firstTag] = props.tagList
    lastTag = props.tagList[props.tagList.length - 1]
  }

  if (firstTag === currentTag) {
    scrollWrapper.value.scrollLeft = 0
  } else if (lastTag === currentTag) {
    scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = props.tagList.findIndex((item) => item === currentTag)
    const prevTag = props.tagList[currentIndex - 1]
    const nextTag = props.tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > scrollWrapper.value.scrollLeft + $containerWidth) {
      scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
      scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({  //将子组件方法暴露出去,父组件调用
  moveToTarget
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
