<template>
  <CreateTitle @save="save"></CreateTitle>
  <CreateType v-model:type="typeFlog"></CreateType>
  <LeftRightMove :flog="typeFlog">
    <template #left>
      <CreateInput
          ref="refInfo"
          :typeDate="outlay.assort"
      ></CreateInput>
    </template>
    <template #right>
      <CreateInput
          ref="refIncomeInfo"
          :typeDate="income.assort"
      ></CreateInput>
    </template>
  </LeftRightMove>

</template>

<script setup lang='ts'>
import CreateTitle from '@/components/Create/CreateTitle.vue'
import CreateType from '@/components/Create/CreateType.vue'
import CreateInput from '@/components/Create/CreateInput.vue'
import {Toast} from 'vant'
import {useExpendStore, useOutlayStore, useIncomeStore} from '@/Store/store'
import {useRouter} from 'vue-router'
import LeftRightMove from '@/components/LeftRightMove.vue'

const router = useRouter()

// 默认支出还是收入
const typeFlog = ref(true)

// 获取用户输入的信息实例
const refInfo = ref()
const refIncomeInfo = ref()

// 存储支出和收入记录的仓库
const expendStore = useExpendStore()

const save = () => {
  const {money, typeString, time, remark} = typeFlog.value ? refInfo.value : refIncomeInfo.value

  if (!money) {
    return Toast({
      type: 'html',
      message: '请输入金额',
      closeOnClick: true,
      closeOnClickOverlay: true
    })
  }
  expendStore.add({
    money,
    typeString,
    time,
    remark,
    typeFlog: typeFlog.value
  })

  router.push('/home')
}

// 获取支出和收入的分类
const outlay = useOutlayStore()
const income = useIncomeStore()

</script>

<style scoped lang='scss'>

</style>
