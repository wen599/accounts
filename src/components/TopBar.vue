<template>
  <div class="topbar">
    <div class="left">
      <slot name="left">
        <i class="iconfont icon-xiangzuojiantou" @click="back"></i>
      </slot>
    </div>
    <div class="center">
      <slot name="center">默认</slot>
    </div>
    <div class="right">
      <slot name="right">&nbsp;&nbsp;&nbsp;&nbsp;</slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()
const back = () => {
  router.back()
}
</script>

<style scoped lang='scss'>
.topbar {
  height: vw(30);
  background-color: $mainColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 vw(10);
  font-size: 12px;

  .left, .center, .right {
    width: vw(70);
    display: flex;

  }

  .left {
    justify-content: flex-start;
  }

  .center {
    justify-content: center;
  }

  .right {
    justify-content: flex-end;
  }
}
</style>
