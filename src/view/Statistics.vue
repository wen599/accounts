<template>
  <TopBar>
    <template #center>
      统计
    </template>
  </TopBar>
  <div class="assort">
    <AssortType>
      <span>按月</span>
    </AssortType>
    <AssortType>
      <span>2022-7</span>
    </AssortType>
    <AssortType>
      <span>支出</span>
    </AssortType>
  </div>
</template>

<script setup lang='ts'>
import TopBar from '@/components/TopBar.vue'
import AssortType from '@/components/AssortType.vue'

</script>

<style scoped lang='scss'>
.assort {
  display: flex;
  padding: vw(12);
  justify-content: space-between;
  font-size: 12px;
}
</style>
