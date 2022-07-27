<template>
  <TopBar>
    <template #center>
      <span>编辑</span>
    </template>
    <template #right>
      <span @click="save">保存</span>
    </template>
  </TopBar>
  <EditInput :id="Number(route.query.id)" ref="editInput"></EditInput>
</template>

<script setup lang='ts'>
import {useRoute, useRouter} from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import EditInput from '@/components/EditExpend/EditInput.vue'
import {useExpendStore} from '@/Store/store'
import {Toast} from 'vant'

// 初始化
const route = useRoute()
const router = useRouter()
const expend = useExpendStore()

// 获取修改后信息
const editInput = ref()

// 保存信息
const save = () => {
  if (!editInput.value.money) return Toast('请输入正确金额')
  editInput.value.info.money = editInput.value.money


  expend.update(editInput.value.info)
  router.back()
}
</script>

<style scoped lang='scss'>

</style>
