<template>
  <router-view></router-view>
  <div class="prompt">
    <p class="text">请在手机屏幕下使用</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.prompt {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;

  > p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: vw(10) vw(15);
    background-color: white;
    border-radius: vw(5);

  }
}

@media (min-width: 500px) {
  .prompt {
    display: block;
  }
}
</style>
