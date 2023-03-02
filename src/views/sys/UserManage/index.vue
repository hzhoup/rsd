<template>
  <a-card>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions">
      <template #toolbtns>
        <a-space>
          <a-button type="primary">添加</a-button>
        </a-space>
      </template>
    </VxeBasicTable>
    <ResetPwdModal @register="register" />
  </a-card>
</template>

<script lang="ts" setup>
import { useModal } from '@/components/Modal/hooks/useModal'
import { BasicTableProps, VxeGridInstance } from '@/components/VxeTable'
import { pageQuery } from '@/components/VxeTable/src/queryMethods'
import ResetPwdModal from '@/views/sys/UserManage/modules/ResetPwdModal.vue'

defineOptions({ name: 'UserManage' })

const tableRef = ref<VxeGridInstance>()
const gridOptions = reactive<BasicTableProps>({
  id: 'UserManageTable',
  toolbarConfig: {
    slots: { buttons: 'toolbtns' }
  },
  columns: [
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
    { field: 'remark', width: 200, title: '备注' }
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
              attrs: { class: 'mr-2' }
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
</script>
