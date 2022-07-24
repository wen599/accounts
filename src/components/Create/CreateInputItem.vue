<template>
  <div class="item">
    <div class="icon">
      <slot name="icon">
        <i class="iconfont icon-set "></i>
      </slot>
    </div>
    <div class="info">
      <slot name="info">
        <i class="iconfont icon-set "></i>
      </slot>
    </div>
    <div class="text">
      <slot name="text">
        <div>111</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.item {
  height: vw(40);
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $fontGray;
}

.icon, .info {
  color: $mainColor;
  margin-right: vw(10);
}
</style>
