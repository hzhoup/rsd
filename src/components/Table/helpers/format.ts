import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { isObject } from 'lodash-es'
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'

// 格式金额，默认2位数
VXETable.formats.add('amount', ({ cellValue }, digits = 2) => {
  return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits })
})

// 格式布尔值
VXETable.formats.add('bool', ({ cellValue }) => {
  return cellValue === true ? '是' : cellValue === false ? '否' : '-'
})

// 格式日期
VXETable.formats.add('date', ({ cellValue }, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (isObject(cellValue)) {
    return (cellValue as Dayjs).format(format)
  } else if (typeof cellValue === 'string') {
    return dayjs(cellValue).format(format)
  }
  return '-'
})

// 格式百分比
VXETable.formats.add('percent', ({ cellValue }) => {
  return cellValue ? `${cellValue} %` : '-'
})

// 格式单位
VXETable.formats.add('unit', ({ cellValue }, unit) => {
  return cellValue ? `${cellValue}${unit ? ' ' : ''}${unit}` : '-'
})
