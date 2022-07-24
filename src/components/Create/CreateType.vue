<template>
  <div class="create-type-container" @click="changeType">
    <div :class="{active:type}">支出</div>
    <div :class="{active:!type}">收入</div>
  </div>
</template>

<script setup lang='ts'>

// 切换收入和支出的逻辑,默认true支出
const props=defineProps({
  type:Boolean
})

const { type } = toRefs(props)

const emit=defineEmits(['update:type'])
const changeType=(e:MouseEvent)=>{
  const newVal=(e.target as HTMLElement).innerText.trim()==='支出'
  emit('update:type',newVal)    
}


</script>

<style scoped lang='scss'>
.create-type-container {
  display: flex;
  background-color: $mainColor;
  margin-bottom: vw(30);

  > div {
    width: 50%;
    color: $fontAside;
    height: vw(35);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.active {
      color: $fontColor;

      &:before {
        content: '';
        display: block;
        position: absolute;
        border: 5px solid transparent;
        border-bottom: 5px solid white;
        left: 48%;
        bottom: 0;

      }
    }
  }
}
</style>
