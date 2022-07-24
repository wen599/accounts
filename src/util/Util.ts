export const formatDate = (date: Date): string => {
  const year = date.getFullYear() + ''
  const month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  const day = (date.getDate()) >= 10 ? date.getDate() : '0' + date.getDate()
  return year + '-' + month + '-' + day
}
export const toPercent = function (point: number) {
  let percent = Number(point * 100).toFixed(1)
  percent += '%'
  return percent
}
export const getWeek = (date: string) => {
  const result = new Date(date).getDay()
  let week: string = ''
  switch (result) {
    case 0 : {
      week = '周日'
      break
    }
    case 1 : {
      week = '周一'
      break
    }
    case 2 : {
      week = '周二'
      break
    }
    case 3 : {
      week = '周三'
      break
    }
    case 4 : {
      week = '周四'
      break
    }
    case 5 : {
      week = '周五'
      break
    }
    case 6 : {
      week = '周六'
      break
    }
  }
  return week
}
