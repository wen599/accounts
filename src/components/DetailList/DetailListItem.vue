<template>
  <ul class="list-container">
    <li>
      <i class="iconfont " :class="className"></i>
      <div class="type-comment">
        <p>{{ props.typeString }}</p>
        <p class="comment">{{ props.remark }}</p>
      </div>
      <div class="money">¥{{ typeFlog ? '-' + money : money }}</div>
    </li>
  </ul>

</template>

<script setup lang='ts'>
import { useOutlayStore, useIncomeStore } from '@/Store/store'
import { defineProps } from 'vue'

type Props = {
  money: number,
  typeString: string,
  time: string,
  remark: string,
  typeFlog: boolean,
  id: number
}
const props = defineProps<Props>()

const className = computed(() => {
  const firstName = props.typeString.split('-')[0]
  const secondlyName = props.typeString.split('-')[1]
  return props.typeFlog ? useOutlayStore().getTwoIcon(firstName, secondlyName) : useIncomeStore().getTwoIcon(firstName, secondlyName)
})

</script>

<style scoped lang='scss'>
.list-container {
  background-color: #f5f5f5;

  > li {
    height: vw(40);
    display: flex;
    align-items: center;

    .type-comment {
      flex: 1;
      padding: vw(5) 0;
    }
  }

  .iconfont {
    color: $mainColor;
    padding: 0 vw(10);
  }

  .comment {
    margin-top: vw(5);
    color: $fontAside;
  }

  .money {
    padding: 0 vw(10);
  }
}

</style>
