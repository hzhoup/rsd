<template>
  <BasicDrawer
    :close-func="closeFunc"
    destroy-on-close
    show-footer
    title="配置角色"
    width="calc(100% - 180px)"
    @ok="handleOk"
    @register="registerDrawer"
  >
    <vxe-table ref="tableRef" :data="tableData" v-bind="tableOptions">
      <vxe-column field="name1" title="目录">
        <template #default="{ row }">
          <a-checkbox
            v-model:checked="row.check1"
            :indeterminate="row.indeterminate1"
            @change="check1ChangeEvent(row, row.check1)"
          >
            {{ row.name1 }}
          </a-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="name2" title="一级">
        <template #default="{ row }">
          <a-checkbox
            v-model:checked="row.check2"
            :indeterminate="row.indeterminate2"
            @change="check2ChangeEvent(row, row.check2)"
          >
            {{ row.name2 }}
          </a-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="name3" title="二级">
        <template #default="{ row }">
          <Check3List :name="row.name2" />
        </template>
      </vxe-column>
      <vxe-column field="name4" title="数据权限">
        <template #default="{ row }">
          <a-radio-group v-model:value="row.check4" @change="e => check4ChangeEvent(e, row)">
            <a-radio :value="0">本人</a-radio>
            <a-radio :value="1">部门</a-radio>
            <a-radio :value="2">公司</a-radio>
          </a-radio-group>
        </template>
      </vxe-column>
    </vxe-table>
  </BasicDrawer>
</template>

<script lang="tsx" setup>
import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
import { BasicTableProps } from '@/components/VxeTable'
import { useMessage } from '@/hooks/useMessage'
import { useGet, usePost } from '@/hooks/useRequest'
import { Checkbox } from 'ant-design-vue'
import { find, isNil } from 'lodash-es'
import XEUtils from 'xe-utils'

const emits = defineEmits(['refresh', 'register'])
const { createMessage } = useMessage()
const tableData = ref<Recordable[]>([])

const toColTreeData = (treeData: any[]) => {
  const options = { children: 'children' }
  const list: any[] = []
  const keyMap: any = {}
  XEUtils.eachTree(
    treeData,
    (item, index, result, paths, parent) => {
      keyMap[item.id] = item
      item.keys = parent ? parent.keys.concat([item.id]) : [item.id]
      if (!item.children || !item.children.length) {
        const row: any = {}
        item.keys.forEach((key: any, index: number) => {
          const level = index + 1
          const obj = keyMap[key]
          row[`check${level}`] = false
          row[`id${level}`] = obj.id
          row[`name${level}`] = obj.name
          row[`indeterminate${level}`] = false
        })
        list.push(row)
      }
    },
    options
  )
  return list
}
onBeforeMount(async () => {
  const { execute, data } = useGet('/role/getMenuAction')
  await execute()
  if (!unref(data)) return
  const treeData = XEUtils.toArrayTree(unref(data))
  tableData.value = toColTreeData(treeData)
})

const check1ChangeEvent = (row: any, checked: boolean) => {
  let childList = unref(tableData).filter(item => item.name1 === row.name1)
  childList.forEach(item => {
    item.check1 = checked
    if (isNil(item.check4)) item.check4 = 0
  })

  childList = unref(tableData).filter(item => item.id1 === row.id1)
  childList.forEach(item => {
    check2ChangeEvent(item, checked)
  })
}

const check2ChangeEvent = (row: any, checked: boolean) => {
  let childList = unref(tableData).filter(item => item.id1 === row.id1 && item.name2 === row.name2)
  childList.forEach(item => {
    item.check2 = checked
    if (isNil(item.check4)) item.check4 = 0
  })

  childList = unref(tableData).filter(item => item.id2 === row.id2)
  childList.forEach(item => {
    check3ChangeEvent(item, checked)
  })
}

const check3ChangeEvent = (row: any, checked: boolean) => {
  let childList = unref(tableData).filter(item => item.id2 === row.id2 && item.name3 === row.name3)
  childList.forEach(item => {
    item.check3 = checked
    if (isNil(item.check4)) item.check4 = 0
  })

  childList = unref(tableData).filter(item => item.id2 === row.id2)
  const isCheckedLen2 = childList.filter(item => item.check3).length
  const isChecked2 = childList.every(item => item.check3)
  childList.forEach(item => {
    item.check2 = isChecked2
    item.indeterminate2 = !!isCheckedLen2 && isCheckedLen2 < childList.length
  })

  childList = unref(tableData).filter(item => item.id1 === row.id1)
  const isCheckedLen1 = childList.filter(item => item.check2).length
  const isChecked1 = childList.every(item => item.check2)
  childList.forEach(item => {
    item.check1 = isChecked1
    item.indeterminate1 = !!isCheckedLen1 && isCheckedLen1 < childList.length
  })
}

const check4ChangeEvent = (e, row) => {
  const value = e.target.value
  const id1 = row.id1
  const id2 = row.id2
  unref(tableData).forEach(item => {
    if (item.id1 === id1 && item.id2 === id2) item.check4 = value
  })
}

const Check3List = ({ name }) => {
  return unref(tableData)
    .filter(item => item.name2 === name)
    .map(item => (
      <Checkbox
        v-model:checked={item.check3}
        indeterminate={item.indeterminate3}
        onClick={() => check3ChangeEvent(item, !item.check3)}
      >
        {item.name3}
      </Checkbox>
    ))
}

const roleId = ref<number>()
const [registerDrawer, { closeDrawer, changeLoading }] = useDrawerInner(async id => {
  const { execute, data } = useGet<Recordable[]>('/role/getRoleMenuIds', { roleId: id })
  await execute()
  if (!unref(data)) return
  data.value?.forEach(item => {
    const row = find(unref(tableData.value), row => row.id3 === item.menuId)
    if (isNil(row)) return
    check3ChangeEvent(row, true)
    check4ChangeEvent({ target: { value: item.dataType } }, row)
  })
  roleId.value = id
  changeLoading(false)
})

const rowspanMethod = ({ row, _rowIndex, column, visibleData }) => {
  const fields = ['name1', 'name2']
  const cellValue = row[column.field]
  if (cellValue && fields.includes(column.field)) {
    const prevRow = visibleData[_rowIndex - 1]
    let nextRow = visibleData[_rowIndex + 1]
    if (prevRow && prevRow[column.field] === cellValue) {
      return { rowspan: 0, colspan: 0 }
    } else {
      let countRowspan = 1
      while (nextRow && nextRow[column.field] === cellValue) {
        nextRow = visibleData[++countRowspan + _rowIndex]
      }
      if (countRowspan > 1) {
        return { rowspan: countRowspan, colspan: 1 }
      }
    }
  }
  if (column.field === 'name3' || column.field === 'name4') {
    const cellValue = row.name2
    const prevRow = visibleData[_rowIndex - 1]
    let nextRow = visibleData[_rowIndex + 1]
    if (prevRow?.name2 === cellValue) {
      return { rowspan: 0, colspan: 0 }
    } else {
      let countRowspan = 1
      while (nextRow?.name2 === cellValue) {
        nextRow = visibleData[++countRowspan + _rowIndex]
      }
      if (countRowspan > 1) {
        return { rowspan: countRowspan, colspan: 1 }
      }
    }
  }
}
const tableOptions = reactive<BasicTableProps>({
  id: 'RoleConfigTable',
  spanMethod: rowspanMethod,
  columns: [
    { title: '目录', slots: { default: 'name1' } },
    { title: '一级', slots: { default: 'name2' } },
    { title: '二级', slots: { default: 'name3' } },
    { title: '数据权限', slots: { default: 'name4' } }
  ]
})

function closeFunc() {
  tableData.value.forEach(row => {
    delete row.check4
    row.check1 = false
    row.check2 = false
    row.check3 = false
  })
  return true
}

async function handleOk() {
  try {
    changeLoading(true)
    const list: Recordable[] = []
    for (const row of tableData.value) {
      if (row.check3) list.push({ menuId: row.id3, dataType: row.check4 })
    }
    const { execute, data } = usePost('/role/setRole', { list, roleId: unref(roleId) })
    await execute()
    if (!unref(data)) return
    createMessage.success('操作成功')
    closeDrawer()
    emits('refresh')
  } finally {
    changeLoading(false)
  }
}
</script>
