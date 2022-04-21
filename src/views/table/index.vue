<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="date" label="Date" width="120" />
      <el-table-column property="name" label="Name" width="120" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup>
const list = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
