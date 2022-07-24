<template>
  <div class="bar-container">
    <div class="bar-left" @click="gotoDetail">
      <i class="iconfont icon-renminbi"></i>
      <div class="text">明细</div>
    </div>
    <div class="bar-center" @click="gotoCreate">
      <i class="iconfont icon-zengjia-copy"></i>
      <div class="text">记一笔</div>
    </div>
    <div class="bar-right" @click="gotoStatistics">
      <i class="iconfont icon-tongji1"></i>
      <div class="text">统计</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()
const gotoCreate = () => {
  router.push('/create')
}
const gotoDetail = () => {
  router.push('/detail')
}
const gotoStatistics = () => {
  router.push('/statistics')
}

</script>

<style scoped lang='scss'>
.bar-container {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  height: vw(40);
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-around;
  font-size: 12px;

  .bar-left, .bar-right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .bar-center {
    align-self: flex-end;
  }

  .iconfont {
    font-size: vw(18);
  }

  .icon-zengjia-copy {
    font-size: vw(40);
    position: absolute;
    left: 50%;
    top: -50%;
    transform: translateX(-50%);
  }
}

.icon-zengjia-copy {
  color: $mainColor;
}
</style>
