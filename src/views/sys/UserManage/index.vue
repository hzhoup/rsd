<template>
  <a-card>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" @checkbox-change="selectChange">
      <template #toolbtns>
        <a-space>
          <a-button type="primary" @click="openSaveUser(null)">添加员工</a-button>
          <a-button :disabled="!selectRowKeys.length" type="primary">设置角色</a-button>
          <a-button :disabled="!selectRowKeys.length" type="primary">设置部门</a-button>
          <a-button :disabled="selectRowKeys.length !== 1" type="primary" @click="openResetPwd">
            重置密码
          </a-button>
          <a-button :disabled="selectRowKeys.length !== 1" type="primary" @click="editStatus">
            {{ getEditText }}
          </a-button>
          <a-button :disabled="selectRowKeys.length !== 1" type="primary" @click="deleteUser">
            删除
          </a-button>
        </a-space>
      </template>
      <template #action="{ row }">
        <a-button type="link">{{ row?.userName }}</a-button>
      </template>
    </VxeBasicTable>
    <ResetPwdModal @register="register" />
    <SaveUserModal @refresh="refresh" @register="registerSaveUserModal" />
  </a-card>
</template>

<script lang="ts" setup>
import { deleteSigneById } from '@/api/common/delete'
import { useModal } from '@/components/Modal'
import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@/components/VxeTable'
import { pageQuery } from '@/components/VxeTable/src/queryMethods'
import { useMessage } from '@/hooks/useMessage'
import { usePost } from '@/hooks/useRequest'
import ResetPwdModal from '@/views/sys/UserManage/modules/ResetPwdModal.vue'
import SaveUserModal from '@/views/sys/UserManage/modules/SaveUserModal.vue'

defineOptions({ name: 'UserManage' })

const { createConfirm, createMessage } = useMessage()

const tableRef = ref<VxeGridInstance>()

function refresh() {
  unref(tableRef)?.commitProxy('reload')
}

const gridOptions = reactive<BasicTableProps>({
  id: 'UserManageTable',
  toolbarConfig: {
    slots: { buttons: 'toolbtns' }
  },
  checkboxConfig: { checkField: 'checked', trigger: 'row', range: true },
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
  },
  proxyConfig: {
    seq: true,
    sort: true,
    autoLoad: true,
    form: true,
    props: {
      result: 'data',
      total: 'totalCount'
    },
    ajax: {
      query: e => pageQuery(e, '/user/getList')
    }
  }
})

const [register, { openModal: openResetPwdModal }] = useModal()
function openResetPwd({ id }) {
  openResetPwdModal(true, { id })
}

const [registerSaveUserModal, { openModal: openSaveUserModal }] = useModal()
function openSaveUser(row) {
  openSaveUserModal(true, row)
}

const selectRowKeys = ref([])
const selectRows = ref<Recordable[]>([])
function selectChange({ $table }) {
  selectRows.value = $table.getCheckboxRecords()
  selectRowKeys.value = $table.getCheckboxRecords().map(row => row.id)
}

const getEditText = computed(() => {
  if (unref(selectRows).length !== 1) return '禁用/启用'
  return unref(selectRows)[0].status ? '启用' : '禁用'
})
const editStatus = () =>
  createConfirm({
    type: 'info',
    iconType: 'info',
    title: `是否确认${unref(getEditText)}用户【${unref(selectRows)[0].userName}】`,
    onOk: async () => {
      const params = { id: unref(selectRows)[0].id, status: unref(selectRows)[0].status ? 0 : 1 }
      const { execute, data } = usePost('/user/updateStatus', params)
      await execute()
      if (!data.value) return
      createMessage.success('操作成功')
      refresh()
    }
  })

const deleteUser = () =>
  createConfirm({
    type: 'info',
    iconType: 'info',
    title: `是否确认删除用户【${unref(selectRows)[0].userName}】`,
    onOk: async () => {
      const { execute, data } = deleteSigneById('user', unref(selectRows)[0].id)
      await execute()
      if (!data.value) return
      createMessage.success('操作成功')
      refresh()
    }
  })
</script>
