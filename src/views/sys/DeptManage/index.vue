<template>
  <a-card>
    <vxe-grid ref="tableRef" v-bind="gridOptions" @checkbox-change="selectDept">
      <template #toolbtns>
        <a-space>
          <a-button type="primary">添加部门</a-button>
          <a-button :disabled="selectRows.length !== 1" type="primary" @click="deleteDept">
            删除
          </a-button>
          <a-button :disabled="selectRows.length !== 1" type="primary" @click="deleteDept">
            用户列表
          </a-button>
        </a-space>
      </template>
      <template #action="{ row }">
        <a-button type="link">{{ row.deptName }}</a-button>
      </template>
    </vxe-grid>
  </a-card>
</template>

<script lang="ts" setup>
import { deleteSigneConfirm } from '@/api/common/delete'
import { BasicTableProps, VxeBasicInstance } from '@/components/VxeTable'
import { useGet } from '@/hooks/useRequest'
import XEUtils from 'xe-utils'

defineOptions({ name: 'MenuManage' })

const tableRef = ref<VxeBasicInstance>()

function refresh() {
  tableRef.value?.commitProxy('reload')
  selectRows.value = []
}

const selectRows = ref<Recordable[]>([])
function selectDept({ $table }) {
  selectRows.value = $table.getCheckboxRecords()
}

const gridOptions = reactive<BasicTableProps>({
  id: 'MenuManageTable',
  border: 'inner',
  toolbarConfig: {
    slots: { buttons: 'toolbtns' }
  },
  checkboxConfig: { checkStrictly: true },
  treeConfig: {
    rowField: 'id',
    transform: true,
    parentField: 'parentId'
  },
  columns: [
    { type: 'checkbox', width: 60, align: 'center', fixed: 'left' },
    {
      treeNode: true,
      field: 'deptName',
      title: '部门名称',
      slots: { default: 'action' }
    },
    {
      field: 'masterNames',
      title: '负责人'
    },
    { field: 'remark', title: '备注' }
  ],
  formConfig: {
    enabled: true,
    items: [
      {
        field: 'deptName',
        title: '部门名称',
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
  },
  proxyConfig: {
    ajax: {
      query: ({ form, sort }) => {
        return new Promise(async resolve => {
          const params = Object.assign({}, form)
          if (sort.field) {
            params.field = sort.field
            params.order = sort.order
          }
          const { execute, data } = useGet('/dept/getList', params)
          await execute()
          if (!unref(data)) return resolve([])
          const list = XEUtils.toTreeArray(unref(data), { clear: true })
          return resolve(list)
        })
      }
    }
  }
})

const deleteDept = () => {
  const title = `部门【${selectRows.value[0].deptName}】`
  return deleteSigneConfirm({
    title,
    prefix: 'dept',
    id: selectRows.value[0].id,
    afterDeleteFn: refresh
  })
}
</script>
