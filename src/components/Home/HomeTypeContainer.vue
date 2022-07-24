<template>
  <div class="home-type-container">
    <HomeType :class="{active:props.typeFlog}" @click="changeType">
      <template #description>
        本月支出
      </template>
      <template #money>
        {{props.currentMonthMoney.outlay}}
      </template>
    </HomeType>
    <HomeType :class="{active:!props.typeFlog}" @click="changeType">
      <template #description>
        本月收入
      </template>
      <template #money>
        {{props.currentMonthMoney.income}}
      </template>
    </HomeType>
  </div>
</template>

<script setup lang='ts'>
import HomeType from '@/components/Home/HomeType.vue'

// 本月支出的金额
type Props = {
  typeFlog:boolean,
  currentMonthMoney:{
    outlay:number,
    income:number
  }
}
const props=defineProps<Props>()
const emit=defineEmits(['update:typeFlog'])

// 切换支出和收入 默认true支出
const changeType = (e: MouseEvent) => {
  const content: string = (e.currentTarget as HTMLElement).children[0].textContent as string
  emit('update:typeFlog',content.trim() === '本月支出')
}




</script>

<style scoped lang='scss'>
.home-type-container {
  display: flex;
  background-color: $mainColor;
  font-size: 10px;
  color: $fontAside;
}

</style>
