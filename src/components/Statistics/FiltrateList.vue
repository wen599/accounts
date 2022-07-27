<template>
  <div class="filtrate-list">
    <div class="title">
      {{ props.type === '支出' ? '总支出' : '总收入' }}:<span>{{ all }}</span>
    </div>
    <list-item
        v-for="(item,index) in props.list"
        :key="index"
        :item="item"
        :all="all"
        :type="props.type"
    ></list-item>
  </div>
</template>

<script lang="ts" setup>

type Props = {
  list: any[]
  type: string
}
const props = defineProps<Props>()

// 总共的金额
const all = computed(() => {
  return props.list.reduce((sum, item) => {
    return sum + Number(item.allMoney)
  }, 0)
})

</script>

<style lang="scss" scoped>
.filtrate-list {
  .title {
    margin-bottom: vw(10);

    > span {
      color: rgb(6, 128, 36);
    }
  }
}
</style>
