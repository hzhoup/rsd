<template>
  <a-modal :visible="visible" :width="960" title="配置角色" @cancel="cancel" @ok="handleOk">
    <vxe-table
      :data="state.tableData"
      :scroll-y="{ enabled: false }"
      :span-method="rowspanMethod"
      border
      height="600"
    >
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
  </a-modal>
</template>

<script lang="tsx" setup>
import { useMessage } from '@/hooks/useMessage'
import { Checkbox } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import XEUtils from 'xe-utils'
import { getMenuAction, getRoleMenuIds, setRole } from './useRoleManage'

let defaultTableData: Recordable[]
const visible = ref(false)
const roleId = ref<Recordable>()
const state = reactive<Recordable>({})
const { createMessage } = useMessage()

onBeforeMount(async () => {
  const treeData = await getMenuAction()
  toColTreeData(treeData)
})
// 将普通树结构转换为横向树列表
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
  defaultTableData = cloneDeep(list)
  state.tableData = list
}

// 通用行合并函数（将相同多列数据合并为一行）
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

async function open(id) {
  roleId.value = id
  const data = await getRoleMenuIds(id)
  if (!data) return
  state.tableData.forEach(item => {
    const row = (data as Recordable[]).find(d => d.menuId === item.id3)
    if (row) {
      check3ChangeEvent(item, true)
      item.check4 = row.dataType
      check4ChangeEvent({ target: { value: row.dataType } }, item)
    }
  })
  visible.value = true
}

const check4ChangeEvent = (e, row) => {
  const value = e.target.value
  const id1 = row.id1
  const id2 = row.id2
  state.tableData.forEach(item => {
    if (item.id1 === id1 && item.id2 === id2) item.check4 = value
  })
}

const check3ChangeEvent = (row: any, checked: boolean) => {
  let childList = state.tableData.filter(item => item.id2 === row.id2 && item.name3 === row.name3)
  childList.forEach(item => {
    item.check3 = checked
  })
  childList = state.tableData.filter(item => item.id2 === row.id2)
  const isCheckedLen2 = childList.filter(item => item.check3).length
  const isChecked2 = childList.every(item => item.check3)
  console.log()
  childList.forEach(item => {
    item.check2 = isChecked2
    item.indeterminate2 = !!isCheckedLen2 && isCheckedLen2 < childList.length
  })
  childList = state.tableData.filter(item => item.id1 === row.id1)
  const isCheckedLen1 = childList.filter(item => item.check2).length
  const isChecked1 = childList.every(item => item.check2)
  childList.forEach(item => {
    item.check1 = isChecked1
    item.indeterminate1 = !!isCheckedLen1 && isCheckedLen1 < childList.length
  })
}

const check2ChangeEvent = (row: any, checked: boolean) => {
  let childList = state.tableData.filter(item => item.id1 === row.id1 && item.name2 === row.name2)
  childList.forEach(item => {
    item.check2 = checked
  })
  childList = state.tableData.filter(item => item.id2 === row.id2)
  childList.forEach(item => {
    check3ChangeEvent(item, checked)
  })
}

const check1ChangeEvent = (row: any, checked: boolean) => {
  let childList = state.tableData.filter(item => item.name1 === row.name1)
  childList.forEach(item => {
    item.check1 = checked
  })
  childList = state.tableData.filter(item => item.id1 === row.id1)
  childList.forEach(item => {
    check2ChangeEvent(item, checked)
  })
}

const Check3List = ({ name }) => {
  return state.tableData
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

async function handleOk() {
  const params = { roleId: unref(roleId), list: [] as Recordable[] }
  const map = {}
  const data = state.tableData
  data.forEach(item => {
    for (let i = 1; i < 4; i++) {
      if (item[`check${i}`]) map[item[`id${i}`]] = item.check4
    }
    // if (!isNil(item.check4)) {
    //   if (map?.[item.id1]) map[item.id1] = item.check4
    //   if (map?.[item.id2]) map[item.id2] = item.check4
    // }
  })
  for (const key of Object.keys(map)) {
    params.list.push({ menuId: +key, dataType: map[key] })
  }
  if (await setRole(params)) {
    createMessage.success('操作成功')
    cancel()
  }
}

function cancel() {
  roleId.value = undefined
  state.tableData = cloneDeep(defaultTableData)
  visible.value = false
}

defineExpose({ open })
</script>
