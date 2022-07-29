<template>
  <div class="create-input-container">
    <input placeholder="0.00" v-model="money" class="input-money" type="number">
    <CreateInputItem @click="showPopup">
      <template #icon>
        <i class="iconfont icon-type"></i>
      </template>
      <template #info>
        <span>类型</span>
      </template>
      <template #text>
        <span>{{ xxx }}</span>
      </template>
    </CreateInputItem>

    <!-- 类型选择 -->
    <van-popup v-model:show="show" position="bottom">
      <van-picker
          ref="picker"
          :show-toolbar="false"
          :columns="columns"
          @change="onChange"
      />
    </van-popup>
    <CreateInputItem @click.prevent="showDate">
      <template #icon>
        <i class="iconfont icon-shijian"></i>
      </template>
      <template #info>
        <span>时间</span>
      </template>
      <template #text>
        <span>{{ info.time }}</span>
      </template>
    </CreateInputItem>

    <!--  日期选择 -->
    <van-popup v-model:show="flog" position="bottom">
      <van-datetime-picker
          :show-toolbar="false"
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
      />
    </van-popup>
    <!-- 备注 -->
    <CreateInputItem>
      <template #icon>
        <i class="iconfont icon-beizhu"></i>
      </template>
      <template #info>
        <span>备注</span>
      </template>
      <template #text>
        <input placeholder="请输入备注" v-model="info.remark">
      </template>
    </CreateInputItem>
  </div>

</template>

<script setup lang='ts'>
import CreateInputItem from '@/components/Create/CreateInputItem.vue'
import {useExpendStore, useIncomeStore, useOutlayStore} from '@/Store/store'
import {formatDate} from '@/util/Util'
import {PickerInstance} from 'vant'
import {Ref} from "vue";


type Props = {
  id: number
}
// 初始化
const props = defineProps<Props>()
const expend = useExpendStore()
const income = useIncomeStore()
const outlay = useOutlayStore()

// 根据id获取记账信息
const info = toRaw(expend.getInfo(props.id))
const money: Ref<number> = ref(info.money)

watchEffect(() => {
  money.value = Number(money.value?.toFixed(3).substring(0, money.value?.toFixed(3).length - 1))
})

const xxx = ref(info.typeString)

// 显示类型选择的逻辑
const show = ref(false)
const showPopup = () => {
  show.value = true
}
// 类型选择的数据
const picker = ref<PickerInstance>()
const data = info.typeFlog ? outlay.assort : income.assort
type Cities = {
  [key: string]: Array<string>
}
const cities: Cities = {}
for (let i = 0; i < data.length; i++) {
  const arr: Array<string> = []
  data[i].children.forEach((item: any) => {
    arr.push(item.name)
  })
  cities[data[i].name] = arr
}
const columns = [
  {values: Object.keys(cities)},
  {values: cities[info.typeFlog ? '餐饮日常' : '职业收入']}
]
const onChange = (values: string[]) => {
  picker.value?.setColumnValues(1, cities[values[0]])
}
watch(show, () => {
  if (!show.value) {
    xxx.value = picker.value?.getValues()[0] + '-' + picker.value?.getValues()[1]
  }
})
// 显示时间选择的逻辑
const flog = ref(false)
const showDate = () => {
  flog.value = true
}
// 日期选择的数据
const currentDate = ref(new Date(info.time))
const minDate = new Date(1997, 0, 1)
const maxDate = new Date(2100, 10, 1)
// 日期更改的函数
watch(currentDate, (newVal, oldVal) => {
  info.time = formatDate(currentDate.value)
})

// 导出修改后的数据
defineExpose({
  info,
  money,
  xxx
})
</script>

<style scoped lang='scss'>
.create-input-container {
  padding: vw(30) vw(25) 0;

  .input-money {
    width: 100%;
    border-bottom: 2px solid #74c04c;
    font-size: 40px;
    padding-bottom: 5px;
  }
}

</style>
