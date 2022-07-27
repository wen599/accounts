<template>
  <teleport to="body">
    <transition name="slowly">
      <div class="container" v-if="props.variable">
        <div class="mask" @click="closeSelectTime"></div>
        <div class="content">
          <div class="title">自定义时间区间</div>
          <div class="startTime">
            <div>开始时间</div>
            <div class="time" @click="show=!show">{{ formatDate(currentDate) }}</div>
          </div>
          <div class="endtime">
            <div>结束时间</div>
            <div class="time" @click="endShow=!endShow">{{ formatDate(currentDateEnd) }}</div>
          </div>
          <div class="footer">
            <span class="cancel" @click="closeSelectTime">取消</span>
            <span class="confirm" @click="save">确定</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
  <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :show-toolbar="false"
    />
  </van-popup>
  <van-popup v-model:show="endShow" position="bottom" :style="{ height: '30%' }">
    <van-datetime-picker
        v-model="currentDateEnd"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :show-toolbar="false"
    />
  </van-popup>

  <teleport to="body">
    <transition name="v">
      <div class="prompt-container" v-if="showPrompt">
        开始时间不能在结束时间之前
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts" setup>
import { formatDate } from '@/util/Util'
// 初始化
type Props = {
  variable: boolean
  startTime: string
  endTime: string
}
const props = defineProps<Props>()

const emit = defineEmits(['update:variable', 'update:startTime', 'update:endTime'])

// 关闭定义事件选择器
const closeSelectTime = () => {
  emit('update:variable', false)
}

// 弹出层数据
const show = ref(false)
const endShow = ref(false)

//  DatetimePicker时间选择
const minDate = new Date(1997, 0, 1)
const maxDate = new Date(2100, 10, 1)
const currentDate = ref(new Date())
const currentDateEnd = ref(new Date())
watchEffect(() => {
  currentDate.value = new Date(props.startTime)
  currentDateEnd.value = new Date(props.endTime)
})

// 保存选择的时间区间
let time: any = null
const save = () => {
  const start = formatDate(currentDate.value)
  const end = formatDate(currentDateEnd.value)
  // 如果时间不对则提示
  if (Date.parse(start) >= Date.parse(end) && !time) {
    showPrompt.value = true
    time = setTimeout(() => {
      showPrompt.value = false
      time = null
    }, 1500)
    return
  }
  emit('update:startTime', start)
  emit('update:endTime', end)
  emit('update:variable', false)
}

// 信息提示的逻辑
const showPrompt = ref(false)

</script>

<style lang="scss" scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.15s;
}

.slowly-enter-from,
.slowly-leave-to {
  opacity: 0;
}

.slowly-enter-active,
.slowly-leave-active {
  transition: all 0.25s;
}

.prompt-container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  font-size: 14px;
  padding: vw(10) vw(15);
  background-color: #eee;
  border-radius: vw(7);
  white-space: nowrap;
}

.container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 999;
  font-size: 12px;
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
}

.content {
  position: absolute;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: vw(5);
  background-color: white;
  padding: vw(15);

  > .title {
    text-align: center;
    padding-bottom: vw(10);
  }

  > .endtime {
    padding: vw(10) 0;
    display: flex;

  }

  > .startTime {
    padding: vw(10) 0;
    display: flex;

  }

  .time {
    cursor: pointer;
    margin-left: vw(20);
    padding: vw(2) vw(10);
    border-radius: 5px;
    border: 1px solid $mainColor;
  }
}

.footer {
  display: flex;
  padding: 0 vw(25);
  justify-content: space-between;
  font-size: 12px;

  > span {
    cursor: pointer;
    border-radius: vw(5);
    border: 1px solid $mainColor;
    padding: vw(3) vw(5);
  }

  .cancel {
    color: $mainColor;
  }

  .confirm {
    color: #fff;
    background-color: $mainColor;

  }
}

</style>
