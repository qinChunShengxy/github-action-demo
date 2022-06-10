<template>
  <div class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="pageIndex"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
    />
  </div>
</template>

<script setup>
import { watch } from 'vue'
const props = defineProps({
  method: {
    type: Function
  },
  total: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'all'
  },
  pageIndex: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default() {
      return [20, 40, 60, 80]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  }
})
const emit = defineEmits(['update:pageIndex', 'update:pageSize'])

watch(
  () => props.pageIndex,
  (val) => {
    emit('update:pageIndex', val)
    props.method({ pageIndex: val, pageSize: props.pageSize })
  }
)

watch(
  () => props.pageSize,
  (val) => {
    emit('update:pageSize', val)
    props.method({ pageIndex: props.pageIndex, pageSize: val })
  }
)
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
</style>
