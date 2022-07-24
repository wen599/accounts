<template>
  <TopBar>
    <template #center>
      <div>记账</div>
    </template>
    <template #right>
      <div @click="emit('save')">保存</div>
    </template>
  </TopBar>
</template>

<script setup lang='ts'>
import TopBar from '@/components/TopBar.vue'
  
const emit=defineEmits(['save'])

</script>

<style scoped lang='scss'>

</style>
