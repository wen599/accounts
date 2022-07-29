import {defineStore} from 'pinia'
import {Names} from './store-namespace'
import {outlay, earning} from './assortDefault'
import {formatDate} from '@/util/util'

// 支出分类
export const useOutlayStore = defineStore(Names.outlay, {
    state: () => {
        return {
            nextID: 12,
            assort: outlay
        }
    },
    getters: {
        firstLevel() {
            const arr: string[] = []
            this.assort.forEach((item) => {
                arr.push(item.name)
            })
            return arr
        }

    },
    actions: {
        getIcon(name: string) {
            for (let i = 0; i < this.$state.assort.length; i++) {
                if (this.$state.assort[i].name === name) return this.$state.assort[i].icon
            }
        },
        getTwoIcon(firstName: string, secondlyName: string): string {
            let icon = ''
            for (let i = 0; i < this.$state.assort.length; i++) {
                if (this.$state.assort[i].name === firstName) {
                    this.$state.assort[i].children.forEach((item) => {
                        if (item.name === secondlyName) {
                            icon = item.icon
                        }
                    })
                }
            }
            return icon
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
        firstLevel() {
            const arr: string[] = []
            this.assort.forEach((item) => {
                arr.push(item.name)
            })
            return arr
        }
    },
    actions: {
        getIcon(name: string) {
            for (let i = 0; i < this.$state.assort.length; i++) {
                if (this.$state.assort[i].name === name) return this.$state.assort[i].icon
            }
        },
        getTwoIcon(firstName: string, secondlyName: string): string {
            let icon = ''
            for (let i = 0; i < this.$state.assort.length; i++) {
                if (this.$state.assort[i].name === firstName) {
                    this.$state.assort[i].children.forEach((item) => {
                        if (item.name === secondlyName) {
                            icon = item.icon
                        }
                    })
                }
            }
            return icon
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
            obj = {nextID: 1, expenseRecords: []}
        }
        return obj
    },
    actions: {
        add(info: info) {
            info = {...info, id: this.nextID}
            this.expenseRecords.push(info)
            this.nextID++
        },
        getInfo(id: number) {
            const list = this.$state.expenseRecords
            return list.find((item: any) => {
                return item.id === Number(id)
            })
        },
        update(info: info) {
            this.$state.expenseRecords.forEach((item: any) => {
                if (item.id === info.id) {
                    item = info
                    localStorage.setItem('record', JSON.stringify(this.$state))
                }
                // console.log('保存失败');
            })
        }
    },
    getters: {
        // 当前月的支出和收入金额
        currentMonthMoney() {
            let outlay = 0
            let income = 0
            const outlayArr = <any>[]
            const incomeArr = <any>[]
            const currentMonth = formatDate(new Date()).substring(0, 7)

            this.expenseRecords.forEach((item: info) => {
                if (item.time.indexOf(currentMonth) !== -1) {
                    if (item.typeFlog) {
                        outlay += item.money * 100
                        outlayArr.push(item)
                    } else {
                        income += item.money * 100
                        incomeArr.push(item)
                    }
                }

            })
            //   解决精度丢失的问题

            outlay = outlay / 100
            income = income / 100
            return {
                outlay,
                income,
                outlayArr,
                incomeArr
            }
        },
        allMonth() {
            const set = new Set()
            this.expenseRecords.forEach((item: info) => {
                set.add(item.time.substring(0, 7))
            })
            return [...set]
        }
    }
})

useExpendStore().$subscribe((args: any, state: any) => {
        localStorage.setItem('record', JSON.stringify(state))
    }, {detached: true}
)
