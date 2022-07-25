<template>
  <div class="home-detail">
    <div class="detail-default" v-if="outlayList.length===0">
      <p>本月暂无数据</p>
      <p>点击下方"+"记一笔吧</p>
    </div>
    <HomeDetailItem
        :type="props.type"
        :money="item.money"
        :icon="item.icon"
        :text="item.text"
        v-for="(item ,index) in outlayList"
        :key="index"
        @click="gotoDetail(item.text)"
    ></HomeDetailItem>
  </div>
</template>

<script setup lang='ts'>
import HomeDetailItem from './HomeDetailItem.vue';
import {useExpendStore} from '@/Store/store';
import {storeToRefs} from 'pinia';
import {useOutlayStore, useIncomeStore} from '@/Store/store';
import {useRouter} from 'vue-router';


const {currentMonthMoney} = storeToRefs(useExpendStore())
type Props = {
  type: ('支出' | '收入')
}
const props = defineProps<Props>()

const arr = props.type === '支出' ? currentMonthMoney.value.outlayArr : currentMonthMoney.value.incomeArr
const {getIcon} = props.type === '支出' ? useOutlayStore() : useIncomeStore()
const getMoney = (str: string) => {
  let result = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].typeString.indexOf(str) !== -1) {
      result += arr[i].money
    }
  }
  return result
}

const typeSet = new Set()
for (let i = 0; i < arr.length; i++) {
  typeSet.add(arr[i].typeString.split('-')[0])
}

let outlayList = <any>[]
typeSet.forEach(function (item) {
  outlayList.push({
    money: getMoney(item as string),
    text: item,
    icon: getIcon(item as string)
  })
})

outlayList.sort((a: any, b: any) => {
  return a.money > b.money ? -1 : 1
})

// 跳转
const router = useRouter()
const gotoDetail = (text: string) => {
  router.push({
    name: 'detail',
    params: {
      text
    }
  })
}


</script>

<style scoped lang='scss'>

.home-detail {
  // min-height: calc(100vh - #{vw(94)});
}

.detail-default {
  margin: vw(250) auto 0;
  text-align: center;
  background-color: #fff;
  color: $fontAside;
  font-size: 12px;
  width: 50%;
}


</style>
