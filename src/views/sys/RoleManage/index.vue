<template>
  <a-card>
    <VxeBasicTable ref="tableRef" url="/role/getList" v-bind="gridOptions">
      <template #toolbtns>
        <a-space>
          <a-button type="primary" @click="openSaveRole(null)">添加角色</a-button>
          <a-button
            :disabled="tableRef?.selectRows.length !== 1"
            type="primary"
            @click="openRoleConfig"
          >
            配置
          </a-button>
          <a-button :disabled="tableRef?.selectRows.length !== 1" type="primary">
            用户列表
          </a-button>
          <a-button
            :disabled="tableRef?.selectRows.length !== 1"
            type="primary"
            @click="deleteRole"
          >
            删除
          </a-button>
        </a-space>
      </template>
      <template #action="{ row }">
        <a-button type="link" @click="openSaveRole(row)">
          {{ row.roleName }}
        </a-button>
      </template>
    </VxeBasicTable>
    <RoleConfigDrawer @refresh="tableRef?.refresh" @register="registerRoleConfig" />
    <SaveRoleModal @refresh="tableRef?.refresh" @register="registerSaveRoleModal" />
  </a-card>
</template>

<script lang="ts" setup>
import { deleteSigneConfirm } from '@/api/common/delete'
import { useDrawer } from '@/components/Drawer'
import { useModal } from '@/components/Modal'
import { BasicTableProps, VxeBasicInstance } from '@/components/VxeTable'
import VxeBasicTable from '@/components/VxeTable/src/VxeBasicTable'
import RoleConfigDrawer from '@/views/sys/RoleManage/modules/RoleConfigDrawer.vue'
import SaveRoleModal from '@/views/sys/RoleManage/modules/SaveRoleModal.vue'

const tableRef = ref<VxeBasicInstance>()

const gridOptions = reactive<BasicTableProps>({
  id: 'RoleManageTable',
  toolbarConfig: {
    slots: { buttons: 'toolbtns' }
  },
  columns: [
    { type: 'checkbox', width: 60, align: 'center', fixed: 'left' },
    {
      fixed: 'left',
      width: 140,
      title: '角色名称',
      slots: { default: 'action' }
    },
    { field: 'remark', minWidth: 200, title: '备注' }
  ],
  formConfig: {
    enabled: true,
    items: [
      {
        field: 'roleName',
        title: '角色名称',
        itemRender: {
          name: 'AInput'
        },
        span: 6
      },
      {
        span: 18,
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

const deleteRole = () => {
  const title = `角色【${tableRef.value?.selectRows[0].roleName}】`
  return deleteSigneConfirm({
    title,
    prefix: 'role',
    id: tableRef.value?.selectRows[0].id,
    afterDeleteFn: tableRef.value?.refresh
  })
}

const [registerSaveRoleModal, { openModal: openSaveRoleModal }] = useModal()
function openSaveRole(row) {
  openSaveRoleModal(true, row)
}

const [registerRoleConfig, { openDrawer: openRoleConfigDrawer, setDrawerProps }] = useDrawer()
function openRoleConfig() {
  openRoleConfigDrawer(true, tableRef.value?.selectRows[0].id)
  setDrawerProps({ loading: true })
}
</script>
