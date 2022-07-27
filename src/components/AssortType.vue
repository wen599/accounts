<template>
  <div class="container">
    <div class="assort-type">
      <div class="content">
        <slot>
          <span>全部分类</span>
        </slot>
      </div>
      <i class="iconfont icon-sanjiaoxing"></i>
    </div>
    <transition name="v">
      <ul class="bottomList" v-if="props.list?.length && display">
        <li v-for="(item,index) in props.list" :key="index" @click="select(item)">{{ item }}</li>
      </ul>
    </transition>
  </div>

</template>

<script setup lang='ts'>

type Props = {
  list?: string[],
  display?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['changeSelect'])
const select = (item: string) => {
  emit('changeSelect', item)
}

</script>

<style scoped lang='scss'>
.container {
  cursor: pointer;
}

.assort-type {
  padding: vw(2) vw(10);
  border-radius: vw(5);
  border: 1px solid $mainColor;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  position: relative;
  line-height: 1.5;

  .content {
    min-width: 60px;
  }

  .icon-sanjiaoxing {
    color: $mainColor;
    font-size: 8px;
  }
}

.bottomList {
  position: absolute;
  width: vw(90);
  margin-top: vw(2);
  padding: vw(2) vw(10);
  border-radius: vw(5);
  border: 1px solid $mainColor;
  font-size: 12px;
  background-color: rgb(255, 255, 255);
  z-index: 9;

  > li {
    line-height: 2;
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(vw(20));
}

.v-enter-active,
.v-leave-active {
  transition: all 0.25s;
}
</style>
