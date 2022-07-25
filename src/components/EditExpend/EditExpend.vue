<template>
  <TopBar>
    <template #center>
      <span>编辑</span>
    </template>
    <template #right>
      <span>保存</span>
    </template>
  </TopBar>
  <CreateInput></CreateInput>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import CreateInput from '@/components/Create/CreateInput.vue'

const route = useRoute()
console.log(route.params)
</script>

<style scoped lang='scss'>

</style>
