<template>
  <home-title></home-title>
  <home-type-container v-model:typeFlog="typeFlog" :currentMonthMoney="currentMonthMoney"></home-type-container>
  <LeftRightMove :flog="typeFlog">
    <template #left>
      <home-detail type="支出"></home-detail>
    </template>
    <template #right>
      <home-detail type="收入"></home-detail>
    </template>
  </LeftRightMove>
  <home-bottom-bar></home-bottom-bar>
</template>

<script setup lang='ts'>
import HomeTitle from '@/components/Home/HomeTitle.vue'
import HomeTypeContainer from '@/components/Home/HomeTypeContainer.vue'
import HomeBottomBar from '@/components/Home/HomeBottomBar.vue'
import HomeDetail from '@/components/Home/HomeDetail.vue'
import LeftRightMove from '@/components/LeftRightMove.vue'
import { useExpendStore } from '@/Store/store'
import { storeToRefs } from 'pinia'

const enpend = useExpendStore()
const { currentMonthMoney } = storeToRefs(enpend)

// 控制支出还是收入的激活
const typeFlog = ref(true)

</script>

<style scoped lang='scss'>

</style>
