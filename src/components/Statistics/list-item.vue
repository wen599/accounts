<template>
  <div class="list-container">
    <div class="list-item" @click="show=!show">
      <div class="left">
        <i class="iconfont " :class="getStairIcon(item.name)"></i>
      </div>
      <div class="center">
        <div class="content">
          <div class="text">{{ item.name }}</div>
          <div class="money">¥{{ item.allMoney }}</div>
        </div>
        <div class="hr-container">
          <div class="hr" :style="{width:getWidth(item.allMoney)}"></div>
          <div class="hr-two"></div>
        </div>
      </div>
      <div class="right">
        <div :class="{'xiangshang':show}" style="transition: all 0.25s;display: inline-block;">
          <i class="iconfont icon-sanjiaoxing"></i>
        </div>
      </div>
    </div>
    <div v-if="show">
      <div class="children-list" v-for="i in item.children" @click="gotoEdit(i.id)" :key="i.id">
        <div class="left">
          <i class="iconfont " :class="getSecondary(i.typeString)"></i>
        </div>
        <div class="center">
          <div class="content">
            <div class="text">{{ i.typeString }}</div>
            <div class="money">¥{{ i.money }}</div>
          </div>
          <p class="remark">{{ i.remark }}</p>
          <div class="hr-container">
            <div class="hr" :style="{width:getChildrenWidth(i.money,item.allMoney)}"></div>
            <div class="hr-two"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useOutlayStore, useIncomeStore } from '@/Store/store'
import { toPercent } from '@/Util/Util'
import { useRouter } from 'vue-router'

const outlay = useOutlayStore()
const income = useIncomeStore()
type Props = {
  item: any
  type: string
  all: number
}

const props = defineProps<Props>()
const router = useRouter()

// 是否显示子数据
const show = ref(false)
// 获取iconfont
const getStairIcon = (date: string) => {
  if (props.type === '支出') {
    return outlay.getIcon(date)
  }
  return income.getIcon(date)
}
// 获取二级iconfont
const getSecondary = (date: string) => {
  if (props.type === '支出') {
    return outlay.getTwoIcon(date.split('-')[0], date.split('-')[1])
  }
  return income.getTwoIcon(date.split('-')[0], date.split('-')[1])
}

// 计算每一项下面的宽度
const getWidth = (money: number) => {
  return toPercent(money / props.all)
}
// 计算children每一项下面的宽度
const getChildrenWidth = (money: number, all: number) => {
  return toPercent(money / all)
}

const gotoEdit = (id: number) => {
  router.push({
    path: '/edit',
    query: {
      id
    }
  })
}

</script>
<style lang="scss" scoped>
.xiangshang {
  transform: rotate(180deg)
}

.list-item {
  display: flex;
  position: relative;

  > .left {
    color: $mainColor;
    width: 30px;
    text-align: center;
    align-self: center;
  }

  > .center {
    flex: 1;
    padding: vw(5) vw(10);

    > .content {

      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    .hr-container {
      display: flex;
    }

    .hr {
      margin-top: vw(10);
      // width: 100%;
      height: 2px;
      background-color: $mainColor;
    }

    .hr-two {
      margin-top: vw(10);
      flex: 1;
      height: 2px;
      background-color: rgba(245, 245, 245);
    }

  }

  > .right {
    color: $mainColor;
    width: 30px;

    align-self: center;

    .iconfont {
      font-size: 12px;
    }
  }
}

.children-list {
  margin: vw(10) 30px;
  padding: 0 vw(10);
  display: flex;
  font-size: 12px;

  > .left {
    color: $mainColor;
    width: 30px;
    text-align: center;
    align-self: center;
  }

  > .center {
    flex: 1;

    > .content {

      display: flex;
      justify-content: space-between;
    }

    .hr-container {
      display: flex;
    }

    .hr {
      margin-top: vw(10);
      // width: 100%;
      height: 2px;
      background-color: $mainColor;
    }

    .hr-two {
      margin-top: vw(10);
      flex: 1;
      height: 2px;
      background-color: rgba(245, 245, 245);
    }

  }
}

.remark {
  color: rgb(211, 211, 211);
}
</style>
