<template>
  <div class="statistics-container" @click="closeAll">
    <TopBar>
      <template #center>
        统计
      </template>
    </TopBar>
    <div class="assort">
      <AssortType
          :list="timeTypeList"
          :display="timeTypeRevealer"
          @click.stop="changeTimeTypeRevealer"
          @changeSelect="changeTimeType"
      >
        <span>{{ timeType }}</span>
      </AssortType>
      <AssortType
          :list="timeList"
          :display="timeRevealer"
          @click.stop="changeTimeRevealer"
          @changeSelect="changeTime"
      >
        <span style="white-space: nowrap">{{ time }}</span>
      </AssortType>
      <AssortType
          :list="typeList"
          :display="typeRevealer"
          @click.stop="changeTypeRevealer"
          @changeSelect="changeType"
      >
        <span>{{ type }}</span>
      </AssortType>

    </div>
    <div class="echarts" id="main" v-if="echartsShow"></div>
    <FiltrateList :list="filterList" :type="type as string" class="filterList"></FiltrateList>

  </div>

  <SelectTime
      v-model:variable="showTimeSelect"
      v-model:startTime="startTime"
      v-model:endTime="endTime"
  ></SelectTime>

</template>

<script setup lang='ts'>
import TopBar from '@/components/TopBar.vue'
import AssortType from '@/components/AssortType.vue'
import SelectTime from '@/components/Statistics/SelectTime.vue'
import {nextMonthFirstDay} from '@/Util/Util'
import {useExpendStore} from '@/Store/store'
import {storeToRefs} from 'pinia'
import {formatDate} from '@/util/Util'
import {onUnmounted, Ref} from 'vue'
import FiltrateList from '../components/Statistics/FiltrateList.vue'
// echarts
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import {PieChart, PieSeriesOption} from 'echarts/charts'
import {LabelLayout} from 'echarts/features'
import {CanvasRenderer} from 'echarts/renderers'

const echartsShow = ref(true)
onUnmounted(() => {
  echartsShow.value = false
})

// 初始化
const {expenseRecords} = storeToRefs(useExpendStore())
const list = expenseRecords.value

// 点击其他地方关闭三个选择器
const closeAll = () => {
  timeRevealer.value = false
  timeTypeRevealer.value = false
  typeRevealer.value = false
}

// 默认日期类型数据
const timeType = ref('按月')
// 按月 按年 自定义 数据
const timeTypeList: string[] = reactive(['按月', '按年', '自定义'])
const timeTypeRevealer: Ref<boolean> = ref(false)
// 更改时间的类型
const changeTimeType = (timeName: string) => {
  timeType.value = timeName
}
// 更改日期类型选择器的显示
const changeTimeTypeRevealer = () => {
  timeRevealer.value = false
  typeRevealer.value = false
  timeTypeRevealer.value = !timeTypeRevealer.value
}

// 按记账的记录生成日期列表
let set: Set<string> = new Set<string>()
// 默认日期数据
const timeRevealer: Ref<boolean> = ref(false)
const time = ref(formatDate(new Date()).substring(0, 7))
const startTime: Ref<string> = ref('')
const endTime: Ref<string> = ref('')

// 日期选择的数据
const timeList = computed(() => {
  const timeList: string[] = reactive([])
  set = new Set<string>()
  if (timeType.value === '按月') {
    list.forEach((item: any) => {
      set.add(item.time.substring(0, 7))
    })
  } else if (timeType.value === '按年') {
    list.forEach((item: any) => {
      set.add(item.time.substring(0, 4))
    })
  }
  timeList.push(...set)
  time.value = timeList[0]

  if (timeType.value === '自定义') {
    time.value = startTime.value + '~' + endTime.value
  }
  return timeList
})
// 初始时间的数据
const date = new Date()
const startMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
const endMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 2) : '0' + (date.getMonth() + 2)
startTime.value = date.getFullYear() + '-' + startMonth + '-01'
endTime.value = date.getFullYear() + '-' + endMonth + '-01'

// 控制自定义时间时显示自定义时间区间
const showTimeSelect = ref(false)

// 更改日期选择器
const changeTimeRevealer = () => {
  if (timeType.value === '自定义') {
    closeAll()
    showTimeSelect.value = !showTimeSelect.value
  } else {
    timeTypeRevealer.value = false
    typeRevealer.value = false
    timeRevealer.value = !timeRevealer.value
  }
}
// 更改时间
const changeTime = (date: string) => {
  time.value = date
}

// 默认支出 or 收入
const type = ref('支出')
const typeRevealer: Ref<boolean> = ref(false)
// 支出收入列表数据
const typeList: string[] = reactive(['支出', '收入'])
// 更改支出或收入选择
const changeType = (date: string) => {
  type.value = date
}
// 更改收入支出选择器的显示
const changeTypeRevealer = () => {
  timeRevealer.value = false
  timeTypeRevealer.value = false
  typeRevealer.value = !typeRevealer.value
}

// 过滤后的记账记录

let filters: any[]

const filterList: Ref<Array<any>> = ref([])
const echartsDate: Ref<Array<any>> = ref([])
watchEffect(() => {
  filters = []
  const toRawList = toRaw(list)
  if (type.value === '支出') {
    filters.push(...toRawList.filter((item: any) => item.typeFlog))
  } else {
    filters.push(...toRawList.filter((item: any) => !item.typeFlog))
  }
  if (timeType.value === '按月') {
    const start = time.value + '-01 00:00:00'
    const startDate = new Date(start).getTime()
    const endDate = new Date(nextMonthFirstDay(start)).getTime()
    filters = filters.filter((item) => {
      const number = new Date(item.time).getTime()
      return number >= startDate && number <= endDate
    })
  }
  if (timeType.value === '按年') {
    const start = time.value + '-01-01 00:00:00'
    const end = Number(time.value) + 1 + '-01-01 00:00:00'
    const startDate = new Date(start).getTime()
    const endDate = new Date(end).getTime()
    filters = filters.filter((item) => {
      const number = new Date(item.time).getTime()
      return number >= startDate && number <= endDate
    })
  }
  if (timeType.value === '自定义') {
    const start = time.value.split('~')[0]
    const end = time.value.split('~')[1]
    const startDate = new Date(start).getTime()
    const endDate = new Date(end).getTime()
    filters = filters.filter((item) => {
      const number = new Date(item.time).getTime()
      return number >= startDate && number <= endDate
    })
  }

  type FilterObj = {
    [key: string]: any[]
  }

  const filterObj: FilterObj = reactive({})
  filters.forEach((item) => {
    const stair = item.typeString.split('-')[0]
    // eslint-disable-next-line no-prototype-builtins
    const has = filterObj.hasOwnProperty(item.typeString.split('-')[0])

    if (!has) {
      filterObj[stair] = []
    }
    filterObj[stair].push(item)
  })
  filterList.value = []
  for (const i in filterObj) {
    filterList.value.push({
      name: i,
      allMoney: filterObj[i].reduce((preVal, curVal) => preVal + curVal.money, 0),
      children: filterObj[i]
    })
  }
  filterList.value.sort((a, b) => {
    return a.allMoney > b.allMoney ? -1 : 1
  })
  filterList.value.forEach((item) => {
    item.children.sort((a: any, b: any) => {
      return a.money > b.money ? -1 : 1
    })
  })

  echartsDate.value = []
  filterList.value.forEach((item) => {
    echartsDate.value.push({
      value: item.allMoney,
      name: item.name
    })
  })
})

// echarts

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | LegendComponentOption | PieSeriesOption>;

let chartDom: any
let myChart: any
let option: EChartsOption
onMounted(() => {
  setTimeout(() => {
    chartDom = (document.querySelector('#main') as HTMLElement)
    myChart = echarts.init(chartDom)

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '10',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: echartsDate.value
        }
      ]
    }

    option && myChart.setOption(option)
  }, 200)
})

onUpdated(() => {
  setTimeout(() => {
    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'top'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'bottom'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '10',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: echartsDate.value
        }
      ]
    }

    option && myChart.setOption(option)
  }, 200)
})

</script>

<style scoped lang='scss'>

.filterList {

}

.statistics-container {
  min-height: 100vh;
}

.assort {
  display: flex;
  padding: vw(12);
  justify-content: space-between;
  font-size: 12px;
}

.echarts {
  // background-color: red;
  height: vw(500);
}
</style>
