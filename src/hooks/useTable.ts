import { useGet } from '@/hooks/useRequest'
import type { MaybeRef } from '@vueuse/core'
import { TableProps } from 'ant-design-vue'
import { Key } from 'ant-design-vue/es/table/interface'
import { TableRowSelection } from 'ant-design-vue/lib/table/interface'

interface UseTableParams {
  url: MaybeRef<string>
  params?: MaybeRef<Recordable>
  rowKey?: string
  el?: MaybeRef<HTMLElement | null>
  hasPag?: MaybeRef<boolean>
}

interface TableResult {
  data: Recordable[]
  pageNo: number
  pageSize: number
  totalCount: number
  totalPage: number
}

export function useTable({ url, params, el, rowKey = 'id', hasPag = true }: UseTableParams) {
  const list = ref<Recordable[]>([])
  const sort = ref({
    field: '',
    order: ''
  })
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: total => `共 ${total} 条数据`
  })
  const selectedRowKeys = ref<Key[]>([])
  const selectedRows = ref<Recordable[]>([])

  const query = computed(() => {
    const _query = {
      ...unref(params),
      ...unref(sort)
    }
    if (hasPag)
      return Object.assign(_query, {
        pageNo: pagination.value.current,
        pageSize: pagination.value.pageSize
      })
    else return _query
  })

  const { execute, data, isFetching } = useGet<TableResult>(url, query)

  watch(
    () => data.value,
    newValue => {
      if (newValue) {
        if (hasPag) {
          const { data, pageNo, pageSize, totalCount } = newValue
          list.value = data || []
          pagination.value.current = pageNo
          pagination.value.pageSize = pageSize
          pagination.value.total = totalCount
        } else {
          list.value = (newValue as unknown as Recordable[]) || []
        }
      }
    }
  )

  onMounted(async () => {
    await execute()
  })

  const handleTableChange: TableProps['onChange'] = async (pag, _filters, sorter: any) => {
    if (hasPag) {
      pagination.value.current = pag.current ?? 1
      pagination.value.pageSize = pag.pageSize ?? 10
    }
    sort.value.field = sorter.field
    sort.value.order = sorter.order === 'descend' ? 'desc' : sorter.order === 'ascend' ? 'asc' : ''
    selectedRowKeys.value = []
    selectedRows.value = []
    await execute()
  }

  const onSelectChange: TableRowSelection['onChange'] = (_rowKeys, rows) => {
    selectedRowKeys.value = rows.map(row => row[rowKey])
    selectedRows.value = rows
  }

  // 刷新
  async function refresh(flag = false) {
    if (flag) {
      if (hasPag) pagination.value.current = 1
      selectedRowKeys.value = []
      selectedRows.value = []
      await execute()
    } else {
      await execute()
    }
  }

  // 全屏
  const { toggle: toggleFullscreen } = useFullscreen(el)

  return {
    loading: isFetching,
    pagination,
    list,
    selectedRows,
    selectedRowKeys,
    toggleFullscreen,
    refresh,
    handleTableChange,
    onSelectChange
  }
}
