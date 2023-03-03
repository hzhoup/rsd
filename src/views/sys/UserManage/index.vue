<template>
  <a-card>
    <VxeBasicTable ref="tableRef" url="/user/getList" v-bind="gridOptions">
      <template #toolbtns>
        <a-space>
          <a-button type="primary" @click="openSaveUser(null)"> 添加员工 </a-button>
          <a-button :disabled="!tableRef?.selectRows.length" type="primary"> 设置角色 </a-button>
          <a-button :disabled="!tableRef?.selectRows.length" type="primary"> 设置部门 </a-button>
          <a-button
            :disabled="tableRef?.selectRows.length !== 1"
            type="primary"
            @click="openResetPwd"
          >
            重置密码
          </a-button>
          <a-button
            :disabled="tableRef?.selectRows.length !== 1"
            type="primary"
            @click="editStatus"
          >
            {{ getEditText }}
          </a-button>
          <a-button
            :disabled="tableRef?.selectRows.length !== 1"
            type="primary"
            @click="deleteUser"
          >
            删除
          </a-button>
        </a-space>
      </template>
      <template #action="{ row }">
        <a-button type="link" @click="openSaveUser(row)">
          {{ row.userName }}
        </a-button>
      </template>
    </VxeBasicTable>
    <ResetPwdModal @refresh="tableRef?.refresh" @register="registerResetPwdModal" />
    <SaveUserModal @refresh="tableRef?.refresh" @register="registerSaveUserModal" />
  </a-card>
</template>

<script lang="ts" setup>
import { deleteSigneConfirm } from '@/api/common/delete'
import { useModal } from '@/components/Modal'
import { BasicTableProps, VxeBasicInstance, VxeBasicTable } from '@/components/VxeTable'
import { useMessage } from '@/hooks/useMessage'
import { usePost } from '@/hooks/useRequest'
import ResetPwdModal from '@/views/sys/UserManage/modules/ResetPwdModal.vue'
import SaveUserModal from '@/views/sys/UserManage/modules/SaveUserModal.vue'

defineOptions({ name: 'UserManage' })

const { createConfirm, createMessage } = useMessage()

const tableRef = ref<VxeBasicInstance>()

const gridOptions = reactive<BasicTableProps>({
  id: 'UserManageTable',
  toolbarConfig: {
    slots: { buttons: 'toolbtns' }
  },
  columns: [
    { type: 'checkbox', width: 60, align: 'center', fixed: 'left' },
    {
      fixed: 'left',
      width: 120,
      title: '用户名',
      slots: { default: 'action' }
    },
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
    { field: 'remark', minWidth: 200, title: '备注' }
  ],
  formConfig: {
    enabled: true,
    items: [
      {
        field: 'userName',
        title: '用户名',
        itemRender: {
          name: 'AInput'
        },
        span: 6
      },
      {
        field: 'status',
        title: '状态',
        itemRender: {
          name: 'ASelect',
          props: {
            style: 'width: 100%',
            allowClear: true,
            options: [
              { value: 0, label: '启用' },
              { value: 1, label: '禁用' }
            ]
          }
        },
        span: 6
      },
      {
        span: 12,
        align: 'right',
        className: '!pr-0',
        itemRender: {
          name: 'AButtonGroup',
          children: [
            {
              props: { type: 'primary', content: '查询', htmlType: 'submit' },
              attrs: { class: 'mr-8' }
            },
            { props: { type: 'default', htmlType: 'reset', content: '重置' } }
          ]
        }
      }
    ]
  }
})

const [registerResetPwdModal, { openModal: openResetPwdModal }] = useModal()
function openResetPwd() {
  openResetPwdModal(true, tableRef.value?.selectRows[0])
}

const [registerSaveUserModal, { openModal: openSaveUserModal }] = useModal()
function openSaveUser(row) {
  openSaveUserModal(true, row)
}

const getEditText = computed(() => {
  if (tableRef.value?.selectRows.length !== 1) return '禁用/启用'
  return tableRef.value?.selectRows[0].status ? '启用' : '禁用'
})
const editStatus = () =>
  createConfirm({
    type: 'info',
    iconType: 'info',
    title: `是否确认${unref(getEditText)}用户【${tableRef.value?.selectRows[0].userName}】`,
    onOk: async () => {
      const params = {
        id: tableRef.value?.selectRows[0].id,
        status: tableRef.value?.selectRows[0].status ? 0 : 1
      }
      const { execute, data } = usePost('/user/updateStatus', params)
      await execute()
      if (!data.value) return
      createMessage.success('操作成功')
      tableRef.value?.refresh()
    }
  })

const deleteUser = () => {
  const title = `用户【${tableRef.value?.selectRows[0].userName}】`
  return deleteSigneConfirm({
    title,
    prefix: 'user',
    id: tableRef.value?.selectRows[0].id,
    afterDeleteFn: tableRef.value?.refresh
  })
}
</script>
