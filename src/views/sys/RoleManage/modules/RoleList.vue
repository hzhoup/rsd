<template>
  <FetchTable
    ref="xTable"
    :checkbox-config="{ highlight: true, range: true }"
    :columns="columns"
    :items="items"
    url="/role/getList"
    @checkbox-change="selectChangeEvent"
    @checkbox-all="selectChangeEvent"
  >
    <template #toolbar_buttons>
      <a-button v-if="userId === undefined" type="primary" @click="addOrUpdateRole(null)">
        添加
      </a-button>
    </template>
    <template #operation="{ row }">
      <a-space>
        <a-button type="link" @click="addOrUpdateRole(row)">编辑</a-button>
        <a-button type="link" @click="$refs.roleConfig?.open(row?.id)">配置</a-button>
        <a-button type="link">用户列表</a-button>
        <a-popconfirm
          :title="`是否确认删除`"
          placement="left"
          @confirm="deleteSingle('/role/delete', { id: row?.id }, () => refresh(true))"
        >
          <a-button type="link">删除</a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </FetchTable>
  <RoleConfig ref="roleConfig" />
  <RoleManageModal ref="roleManageModal" @refresh="refresh(true)" />
</template>

<script lang="ts" setup>
import { deleteSingle } from '@/hooks/useFixHttp'
import { useGet } from '@/hooks/useRequest'
import RoleConfig from '@/views/sys/RoleManage/modules/RoleConfigDrawer.vue'
import { isNil } from 'lodash-es'
import { VxeGridProps } from 'vxe-table'
import RoleManageModal from './RoleManageModal.vue'

const xTable = ref()
const roleConfig = ref()
const props = defineProps({
  userId: { type: Number, default: undefined }
})
const { execute, data } = useGet<Recordable>('/role/getUserRoleIds', props)
watch(
  () => props.userId,
  async newValue => {
    if (newValue === undefined) return
    await execute()
    if (!data.value) return
    roleIds.value = data.value.roleIds
    // nextTick(() => {
    //   const $table = xTable.value
    //   console.log($table.list)
    //   const checkedRow = $table?.xTable
    //     .getData()
    //     .filter(row => data.value?.roleIds.includes(row.id))
    //   $table?.xTable.setCheckboxRow(checkedRow, true)
    // })
  },
  { immediate: true }
)
watch(
  () => xTable.value?.xTable,
  newValue => {
    if (isNil(newValue)) return
    const checkedRow = newValue.getData().filter(row => roleIds.value.includes(row.id))
    newValue.setCheckboxRow(checkedRow, true)
  },
  { deep: true, immediate: true }
)

const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60, align: 'center', fixed: 'left' },
  { field: 'roleName', fixed: 'left', width: 120, title: '角色名称' },
  { field: 'remark', title: '描述' },
  { title: '操作', fixed: 'right', width: 320, align: 'center', slots: { default: 'operation' } }
]
const items = [
  {
    field: 'roleName',
    title: '角色名称',
    itemRender: { name: 'AntInput', props: { placeholder: '请输入角色名称' } }
  }
]

function refresh(flag = false) {
  xTable.value.refresh(flag)
}

const roleManageModal = ref()

function addOrUpdateRole(record) {
  roleManageModal.value?.open(record)
}

const selectRowKeys = ref([])
const roleIds = ref<number[]>([])

function selectChangeEvent({ $table }) {
  const records = $table.getCheckboxRecords()
  selectRowKeys.value = unref(records).map(row => row.id)
}

const pageRoleIds = ref<number[]>([])
watch(
  () => xTable.value?.list,
  newValue => {
    if (newValue?.length) pageRoleIds.value = newValue.map(row => row.id)
  },
  { deep: true, immediate: true }
)

function resetRef() {
  selectRowKeys.value = []
  roleIds.value = []
  pageRoleIds.value = []
}

defineExpose({ selectRowKeys, roleIds, pageRoleIds, resetRef })
</script>
