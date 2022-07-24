<template>
  <div class="detail-container">
    <div class="detail-item">
      <div class="icon">
        <i class="iconfont" :class="props.icon"></i>
      </div>
      <div class="info">
        <div class="info-text">{{ props.text }}</div>
        <div class="info-money">{{ '¥' + props.money }}</div>
      </div>
      <div class="right-icon">
        <i class="iconfont icon-jinrujiantou"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useExpendStore } from '@/Store/store'
import { toPercent } from '@/util/Util'

const useExpend = useExpendStore()
type Props = {
  icon: string,
  text: string,
  money: number,
  type: ('支出' | '收入')
}

const props = defineProps<Props>()
const totalize = (props.type === '支出' ? useExpend.currentMonthMoney.outlay : useExpend.currentMonthMoney.income)
const style = ref(toPercent(props.money / totalize))

</script>

<style scoped lang="scss">
.detail-item {
  // outline: 1px solid darkblue;
  display: flex;
  padding: vw(10) vw(15);

  > .icon {
    color: $mainColor;
    width: vw(30);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: vw(10);

    > .iconfont {
      font-size: vw(18);
    }
  }

  > .right-icon {
    width: vw(30);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > .info {
    padding: vw(5) 0 vw(10);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &:before {
      content: '';
      display: block;
      height: 2px;
      background-color: $mainColor;
      position: absolute;
      bottom: 0;
      left: 0;
      width: v-bind(style);
    }
  }

}
</style>
