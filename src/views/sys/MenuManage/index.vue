<template>
  <a-card>
    <vxe-grid ref="tableRef" v-bind="gridOptions" @checkbox-change="selectMenu">
      <template #toolbtns>
        <a-space>
          <a-button type="primary" @click="openSaveMenu(null)">添加菜单</a-button>
          <a-button :disabled="selectRows.length !== 1" type="primary" @click="deleteMenu">
            删除
          </a-button>
        </a-space>
      </template>
      <template #action="{ row }">
        <a-button type="link" @click="openSaveMenu(row)">{{ row.name }}</a-button>
      </template>
    </vxe-grid>
    <SaveMenuModal @refresh="refresh" @register="registerSaveMenuModal" />
  </a-card>
</template>

<script lang="ts" setup>
import { deleteSigneConfirm } from '@/api/common/delete'
import { useModal } from '@/components/Modal'
import { BasicTableProps, VxeBasicInstance } from '@/components/VxeTable'
import { useGet } from '@/hooks/useRequest'
import SaveMenuModal from '@/views/sys/MenuManage/modules/SaveMenuModal.vue'
import { omit } from 'lodash-es'
import XEUtils from 'xe-utils'

defineOptions({ name: 'MenuManage' })

const tableRef = ref<VxeBasicInstance>()

function refresh() {
  tableRef.value?.commitProxy('reload')
  selectRows.value = []
}

const selectRows = ref<Recordable[]>([])
function selectMenu({ $table }) {
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
      field: 'name',
      fixed: 'left',
      width: 160,
      title: '菜单名称',
      slots: { default: 'action' }
    },
    {
      field: 'seq',
      width: 100,
      title: '排序'
    },
    {
      field: 'type',
      width: 100,
      title: '类型',
      formatter: ({ cellValue }) => (cellValue === 0 ? '菜单' : cellValue === 1 ? '目录' : '按钮')
    },
    {
      field: 'url',
      width: 160,
      title: '请求地址'
    },
    {
      field: 'icon',
      width: 120,
      title: '图标'
    },
    {
      field: 'status',
      width: 100,
      title: '状态',
      formatter: ({ cellValue }) => (cellValue ? '可见' : '隐藏')
    },
    { field: 'remark', minWidth: 200, title: '备注' }
  ],
  formConfig: {
    enabled: true,
    items: [
      {
        field: 'menuName',
        title: '菜单名称',
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
              { value: '0', label: '隐藏' },
              { value: '1', label: '显示' }
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
    ajax: {
      query: ({ form, sort }) => {
        return new Promise(async resolve => {
          const params = Object.assign({}, form)
          if (sort.field) {
            params.field = sort.field
            params.order = sort.order
          }
          const { execute, data } = useGet('/menu/getList', params)
          await execute()
          if (!unref(data)) return resolve([])
          const list = XEUtils.toTreeArray(unref(data), { clear: true })
          return resolve(list)
        })
      }
    }
  }
})

const [registerSaveMenuModal, { openModal: openSaveMenuModal, setModalProps }] = useModal()
function openSaveMenu(row) {
  setModalProps({ loading: true })
  openSaveMenuModal(true, row ? omit(row, ['children']) : {})
}

const deleteMenu = () => {
  const title = `菜单【${selectRows.value[0].name}】`
  return deleteSigneConfirm({
    title,
    prefix: 'menu',
    id: selectRows.value[0].id,
    afterDeleteFn: refresh
  })
}
</script>
