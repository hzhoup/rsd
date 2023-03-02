<template>
  <a-card>
    <FetchTable
      ref="xTable"
      :columns="columns"
      :items="items"
      url="/user/getList"
      @checkbox-all="selectChangeEvent"
      @checkbox-change="selectChangeEvent"
    >
      <template #toolbar_buttons>
        <a-space>
          <a-button type="primary" @click="addUser(null)">添加</a-button>
          <a-button type="primary" @click="setAssignedRoles">设置角色</a-button>
          <a-button type="primary">设置部门</a-button>
        </a-space>
      </template>
      <template #operation="{ row }">
        <a-space>
          <a-button type="link" @click="addUser(row)">编辑</a-button>
          <a-button type="link" @click="openResetPwd(row)">重置密码</a-button>
          <a-button type="link" @click="assignedRoles(row)">分配角色</a-button>
          <a-popconfirm
            :title="`是否确认${row.status ? '启用' : '禁用'}`"
            placement="left"
            @confirm="editStatus(row, () => refresh(true))"
          >
            <a-button type="link">
              {{ row.status ? '启用' : '禁用' }}
            </a-button>
          </a-popconfirm>
          <a-popconfirm
            :title="`是否确认删除`"
            placement="left"
            @confirm="deleteSingle('/user/delete', { id: row?.id }, () => refresh(true))"
          >
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </FetchTable>
    <AssignedRolesModal ref="assignedRolesModal" @refresh="refresh(true)" />
    <ResetPwdModal @register="register" />
    <AddUserModal ref="addUserModalRef" @refresh="refresh(true)" />
  </a-card>
</template>

<script lang="ts" setup>
import { useModal } from '@/components/Modal/hooks/useModal'
import { deleteSingle } from '@/hooks/useFixHttp'
import AddUserModal from '@/views/sys/UserManage/modules/AddUserModal.vue'
import AssignedRolesModal from '@/views/sys/UserManage/modules/AssignedRolesModal.vue'
import ResetPwdModal from '@/views/sys/UserManage/modules/ResetPwdModal.vue'
import type { VxeGridProps } from 'vxe-table'
import { VxeTableEvents } from 'vxe-table'
import { editStatus } from './useUserManage'

defineOptions({ name: 'UserManage' })

const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60, align: 'center', fixed: 'left' },
  { field: 'userName', fixed: 'left', width: 120, title: '用户名' },
  { field: 'realName', width: 120, title: '姓名' },
  { field: 'tel', width: 120, title: '电话' },
  { field: 'email', width: 120, title: '邮箱' },
  { field: 'position', width: 120, title: '职位' },
  {
    field: 'gender',
    width: 80,
    title: '性别',
    formatter: ({ cellValue }) => (cellValue === 1 ? '男' : cellValue === 2 ? '女' : '-')
  },
  {
    field: 'status',
    width: 80,
    title: '状态',
    formatter: ({ cellValue }) => (cellValue ? '禁用' : '启用')
  },
  { field: 'remark', width: 200, title: '备注' },
  { title: '操作', fixed: 'right', width: 400, align: 'center', slots: { default: 'operation' } }
]
const items = [
  {
    field: 'userName',
    title: '用户名',
    itemRender: { name: 'AntInput', props: { placeholder: '请输入用户名' } }
  },
  {
    field: 'status',
    title: '状态',
    itemRender: {
      name: 'AntSelect',
      props: {
        allowClear: true,
        placeholder: '请选择状态',
        options: [
          { value: 0, label: '启用' },
          { value: 1, label: '禁用' }
        ]
      }
    }
  }
]

const xTable = ref()

function refresh(flag = false) {
  console.log(xTable.value)
  xTable.value.refresh(flag)
}

const addUserModalRef = ref()

function addUser(record) {
  addUserModalRef.value?.open(record)
}

const assignedRolesModal = ref()

function assignedRoles({ id }) {
  assignedRolesModal.value?.open(id)
}

const selectedRowKeys = ref<number[]>([])
const selectChangeEvent: VxeTableEvents.CheckboxChange = ({ $table }) => {
  const records = $table.getCheckboxRecords()
  selectedRowKeys.value = records.map(row => row.id)
}
const setAssignedRoles = () => {
  assignedRolesModal.value?.open(unref(selectedRowKeys))
}

const [register, { openModal: openResetPwdModal }] = useModal()

function openResetPwd({ id }) {
  openResetPwdModal(true, { id })
}
</script>
