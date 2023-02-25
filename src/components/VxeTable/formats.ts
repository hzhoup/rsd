import dayjs from 'dayjs'
import { isArray, isNil, isNumber, isObject, isString } from 'lodash-es'
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'

// 格式金额，默认2位数
VXETable.formats.add('amount', ({ cellValue }, digits = 2) => {
  return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits })
})

// 格式布尔值
VXETable.formats.add('bool', ({ cellValue }) => {
  return isNil(cellValue) ? '-' : cellValue === true ? '是' : cellValue === false ? '否' : cellValue
})

// 格式日期
VXETable.formats.add('date', ({ cellValue }, format = 'YYYY-MM-DD HH:mm:ss') => {
  return isNil(cellValue) ? '-' : dayjs(cellValue).format(format)
})

// 格式下拉选项
VXETable.formats.add('select', ({ cellValue }, list = []) => {
  if (isNil(cellValue)) return '-'
  if (isArray(cellValue)) {
    return list
      .filter(item => cellValue.includes(+item.value))
      .map(item => item.label)
      .join(',')
  } else if ((isString(cellValue) || isNumber(cellValue)) && isArray(list)) {
    const item = list.find(item => +item.value === +cellValue)
    return item ? item.label : '-'
  } else if ((isString(cellValue) || isNumber(cellValue)) && isObject(list)) {
    return list[cellValue]
  }
})

// 格式百分比
VXETable.formats.add('percent', ({ cellValue }) => {
  return isNil(cellValue) ? '-' : `${cellValue} %`
})

// 格式单位
VXETable.formats.add('unit', ({ cellValue }, unit = '') => {
  return isNil(cellValue) ? '-' : `${cellValue} ${unit}`
})
