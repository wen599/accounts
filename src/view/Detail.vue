<template>
  <div class="container" @click="close">
    <TopBar>
      <template #center>
        明细
      </template>
      <template #right>
        <i class="iconfont icon-zengjia" @click="goto"></i>
      </template>
    </TopBar>
    <div class="assort">
      <AssortType
          :list="detailList"
          :display="showDetailList"
          @click.stop="changDetail"
          @changeSelect="changeDefaultDetail"
      >
        <span>{{ typeObj.type }}</span>
      </AssortType>
      <AssortType
          :list="timeList"
          :display="showTimeList"
          @click.stop="changTime"
          @changeSelect="changeDefaultTime"
      >
        <span>{{ typeObj.time }}</span>
      </AssortType>
      <AssortType>
        <input type="number" placeholder="金额大于" @change="changeDefaultMoney">
      </AssortType>
    </div>
    <div>
      {{ infoList }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import TopBar from '@/components/TopBar.vue'
import AssortType from '@/components/AssortType.vue'
import { useRoute, useRouter } from 'vue-router'
import { useOutlayStore, useIncomeStore, useExpendStore } from '@/Store/store'
import { formatDate, getWeek } from '@/util/Util'

const showDetailList = ref<boolean>(false)
const showTimeList = ref<boolean>(false)
const changDetail = () => {
  showTimeList.value = false
  showDetailList.value = !showDetailList.value
}

const changTime = () => {
  showDetailList.value = false
  showTimeList.value = !showTimeList.value
}
const close = () => {
  console.log(1)
  showDetailList.value = false
  showTimeList.value = false
}

const router = useRouter()
const goto = () => {
  router.push('/create')
}
const expend = useExpendStore()

const detailList: string[] = ['全部分类', ...useOutlayStore().firstLevel, ...useIncomeStore().firstLevel]
const timeList = expend.allMonth

const typeObj = reactive({
  type: '全部分类',
  time: formatDate(new Date()).substring(0, 7),
  money: 0
})
const changeDefaultDetail = (type: string) => {
  typeObj.type = type
}

const changeDefaultTime = (time: string) => {
  typeObj.time = time
}
const changeDefaultMoney = (e: any) => {
  typeObj.money = Number((e.target as HTMLInputElement).value)
}

const route = useRoute()
if (route.params.text) {
  typeObj.type = route.params.text as string
}
type Item = {
  icon: string,
  type: string,
  money: number
}

type Info = {
  time: string,
  total: string,
  list: Item[]
}

type InfoList = Info[]
let infoList: InfoList
// 获取分类的数据
computed(() => {
  return infoList
})
watchEffect(() => {
  infoList = reactive([])
  let infoArr = expend.expenseRecords
  if (typeObj.type === '全部分类') {
    infoArr = infoArr.filter((item: any) => {
      if ((item.money >= typeObj.money && item.time.indexOf(typeObj.time) !== -1)) {
        return item
      }
      return undefined
    })
  } else {
    infoArr = infoArr.filter((item: any) => {
      if ((item.typeString.indexOf(typeObj.type) !== -1 && item.money >= typeObj.money && item.time.indexOf(typeObj.time) !== -1)) {
        return item
      }
      return undefined
    })
  }
  const set = new Set()
  infoArr.forEach((item: any) => {
    set.add(item.time)
  })

  const timeList = [...set]
  timeList.forEach((item) => {
    const obj: Info = {
      time: item as string,
      total: getWeek(item as string),
      list: []
    }
    infoArr.forEach((i: any) => {
      if (i.time.indexOf(item) !== -1) {
        obj.list.push(i)
      }
    })
    infoList.push(obj)
  })
})

</script>

<style scoped lang='scss'>
.container {
  min-height: 100vh;
}

.assort {
  display: flex;
  padding: vw(12);
  justify-content: space-between;
  font-size: 12px;
}

</style>
