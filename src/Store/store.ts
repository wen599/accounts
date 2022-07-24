import { defineStore } from 'pinia'
import { Names } from './store-namespace'
import { outlay, earning } from './assortDefault'
import { formatDate } from '@/util/util'

// 支出分类
export const useOutlayStore = defineStore(Names.outlay, {
  state: () => {
    return {
      nextID: 12,
      assort: outlay
    }
  },
  getters: {
    firstLevel () {
      const arr: string[] = []
      this.assort.forEach((item) => {
        arr.push(item.name)
      })
      return arr
    }

  },
  actions: {
    getIcon (name: string) {
      for (let i = 0; i < this.$state.assort.length; i++) {
        if (this.$state.assort[i].name === name) return this.$state.assort[i].icon
      }
    }
  }
})

// 收入分类
export const useIncomeStore = defineStore(Names.income, {
  state: () => {
    return {
      nextID: 4,
      assort: earning
    }
  },
  getters: {
    firstLevel () {
      const arr: string[] = []
      this.assort.forEach((item) => {
        arr.push(item.name)
      })
      return arr
    }
  },
  actions: {
    getIcon (name: string) {
      for (let i = 0; i < this.$state.assort.length; i++) {
        if (this.$state.assort[i].name === name) return this.$state.assort[i].icon
      }
    }
  }
})

type info = {
    id?: number,
    money: number,
    typeString: string,
    time: string,
    remark: string,
    typeFlog: boolean
}

// 记账记录
export const useExpendStore = defineStore(Names.expend, {
  state: () => {
    let obj = JSON.parse(localStorage.getItem('record') || '{}')
    if (!obj.nextID) {
      obj = { nextID: 1, expenseRecords: [] }
    }
    return obj
  },
  actions: {
    add (info: info) {
      info = { ...info, id: this.nextID }
      this.expenseRecords.push(info)
      this.nextID++
    }

  },
  getters: {
    // 当前月的支出和收入金额
    currentMonthMoney () {
      let outlay = 0
      let income = 0
      const outlayArr = <any>[]
      const incomeArr = <any>[]
      const currentMonth = formatDate(new Date()).substring(0, 7)

      this.expenseRecords.forEach((item: info) => {
        if (item.time.indexOf(currentMonth) !== -1) {
          if (item.typeFlog) {
            outlay += item.money
            outlayArr.push(item)
          } else {
            income += item.money
            incomeArr.push(item)
          }
        }
      })
      return {
        outlay,
        income,
        outlayArr,
        incomeArr
      }
    },
    allMonth () {
      const set = new Set()
      this.expenseRecords.forEach((item: info) => {
        set.add(item.time.substring(0, 7))
      })
      return [...set]
    }
  }
})
