<template>
  <div class="detai-list-cantainer">
    <div class="title">
      <div class="left">
        <span class="time">{{ props.time }}</span>
        <span class="week">{{ props.total }}</span>
      </div>
      <div class="right">
        <span class="text">{{ props.list[0].typeFlog ? '支出:' : '收入:' }}</span>
        <span class="all-money">{{ allMoney }}</span>
      </div>
    </div>
    <DetailListItem
        v-for="i in props.list"
        :key="i.id"
        :money="i.money"
        :typeString="i.typeString"
        :time="i.time"
        :typeFlog="i.typeFlog"
        :remark="i.remark"
        :id="i.id"
        @click="gotoEdit(i)"
    ></DetailListItem>
  </div>
</template>

<script setup lang='ts'>

import DetailListItem from '@/components/DetailList/DetailListItem.vue'
import { useRouter } from 'vue-router'

type Info = {
  money: number,
  typeString: string,
  time: string,
  remark: string,
  typeFlog: boolean,
  id: number
}

type Props = {
  time: string,
  total: string,
  list: Array<Info>
}

const props = defineProps<Props>()

const allMoney = computed(() => {
  return props.list.reduce((previousValue, currentValue) => {
    previousValue += currentValue.money
    return previousValue
  }, 0)
})

const router = useRouter()
const gotoEdit = (info: Info) => {
  const { money, time, typeString, id, remark } = info
  router.push({
    name: 'edit',
    params: {
      money,
      time,
      typeString,
      id,
      remark
    }
  })
}
</script>

<style scoped lang='scss'>
.detai-list-cantainer {
  padding: 0 vw(10);

  > .title {
    display: flex;
    justify-content: space-between;
    padding: vw(10) 0;

    > .right {
      color: $fontAside;
    }
  }
}

</style>
