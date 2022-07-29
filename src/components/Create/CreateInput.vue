<template>
  <div class="create-input-container">
    <!-- <div>记账</div> -->
    <input v-focus placeholder="0.00" v-model="money" class="input-money" type="number">

    <CreateInputItem @click="showPopup">
      <template #icon>
        <i class="iconfont icon-type"></i>
      </template>
      <template #info>
        <span>类型</span>
      </template>
      <template #text>
        <span>{{ typeString }}</span>
      </template>
    </CreateInputItem>

    <!-- 类型选择 -->
    <van-popup v-model:show="show" position="bottom">
      <van-picker
          ref="picker"
          :columns="columns"
          @change="onChange"
          :show-toolbar="false"
          :swipe-duration="500"
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
        <span>{{ time }}</span>
      </template>
    </CreateInputItem>

    <!--  日期选择 -->
    <van-popup v-model:show="flog" position="bottom">
      <van-datetime-picker
          :swipe-duration="500"
          :show-toolbar="false"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @change="selectedTime"
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
        <input placeholder="请输入备注" v-model="remark">
      </template>
    </CreateInputItem>
  </div>

</template>

<script setup lang='ts'>
import CreateInputItem from '@/components/Create/CreateInputItem.vue'
import {Directive, Ref} from 'vue'
import type {PickerInstance} from 'vant'
import {formatDate} from '@/util/Util'

// 金额
const money: Ref<number | undefined> = ref()
//限制money只能保留两位
watchEffect(() => {
  money.value = Number(money.value?.toFixed(3).substring(0, money.value?.toFixed(3).length - 1))
})


// 自动聚焦指令
const vFocus: Directive = {
  mounted: (el: HTMLElement) => {
    setTimeout(() => {
      el.focus()
    }, 1000)
  }
}

type Props = {
  typeDate: any
}

// 类型选择
const props = defineProps<Props>()

const typeString: Ref<string> = ref(props.typeDate[0].name + '-' + props.typeDate[0].children[0].name)
const show = ref(false)
const showPopup = () => {
  show.value = true
}

const picker = ref<PickerInstance>()
type Cities = {
  [key: string]: string[]
}
const cities: Cities = {}

props.typeDate.forEach((item: any) => {
  const arr: Array<string> = []
  item.children.forEach((i: any) => {
    arr.push(i.name)
  })
  cities[item.name] = arr
})

const columns = [
  {values: Object.keys(cities)},
  {values: cities[props.typeDate[0].name]}
]
const onChange = (values: string[]) => {
  (picker.value as any).setColumnValues(1, cities[values[0]])
  typeString.value = picker?.value?.getValues()[0] + '-' + picker?.value?.getValues()[1]
}

// 日期选择
const flog = ref(false)
const currentDate = ref(new Date())
const time = ref(formatDate(currentDate.value))

const minDate = new Date(1997, 0, 1)
const maxDate = new Date(2100, 10, 1)
const showDate = (e: MouseEvent) => {
  flog.value = true
}

const selectedTime = (date: Date) => {
  time.value = formatDate(date)
}

//  备注
const remark: Ref<string> = ref('')

defineExpose({
  money,
  typeString,
  time,
  remark
})

</script>

<style scoped lang='scss'>
.create-input-container {
  padding: 0 vw(25);

  .input-money {
    width: 100%;
    border-bottom: 2px solid #74c04c;
    font-size: 40px;
    padding-bottom: 5px;
  }
}

</style>
