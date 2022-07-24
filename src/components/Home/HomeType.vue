<template>
  <div class="incomeOrExpenses ">
    <div class="description ">
      <slot name="description">默认内容</slot>
    </div>
    <div>
      ¥
      <slot name="money">默认金额</slot>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.incomeOrExpenses {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: vw(20) 0 vw(10);
  position: relative;

  &.active {
    color: $fontColor;

    &:before {
      content: '';
      display: block;
      position: absolute;
      border: vw(5) solid transparent;
      border-bottom: vw(5) solid white;
      left: 48%;
      bottom: 0;
    }
  }

  .description {
    margin-bottom: vw(10);
  }
}

</style>
