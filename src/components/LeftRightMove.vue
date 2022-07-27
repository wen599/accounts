<template>
  <div class="container">
    <transition name="outlay">
      <div class="outlay" v-if="props.flog">
        <slot name="left">默认left</slot>
      </div>
    </transition>
    <transition name="income">
      <div class="income" v-if="!props.flog">
        <slot name="right">默认right</slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">

type Props = {
  flog: boolean
}
const props = defineProps<Props>()

</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.income,
.outlay {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.outlay-enter-from,
.outlay-leave-to {
  left: -100%;
}

.income-enter-from,
.income-leave-to {
  left: 100%;
}

.income-enter-active,
.income-leave-active,
.outlay-enter-active,
.outlay-leave-active {

  transition: all 0.25s;
}

</style>
