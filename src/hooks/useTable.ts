import { useGet } from '@/hooks/useRequest'
import type { MaybeRef } from '@vueuse/core'
import { TableProps } from 'ant-design-vue'

interface UseTableParams {
  url: string
  params?: MaybeRef<Recordable>
}

interface TableResult {
  data: Recordable[]
  pageNo: number
  pageSize: number
  totalCount: number
  totalPage: number
}

export function useTable({ url, params }: UseTableParams) {
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

  const query = computed(() => ({
    ...unref(params),
    ...unref(sort),
    pageNo: pagination.value.current,
    pageSize: pagination.value.pageSize
  }))

  const { execute, data, isFetching } = useGet<TableResult>(url, query)

  watch(
    () => data.value,
    newValue => {
      if (newValue) {
        const { data, pageNo, pageSize, totalCount } = newValue
        list.value = data
        pagination.value.current = pageNo
        pagination.value.pageSize = pageSize
        pagination.value.total = totalCount
      }
    }
  )

  onMounted(async () => {
    await execute()
  })

  const handleTableChange: TableProps['onChange'] = async (pag, _filters, sorter: any) => {
    pagination.value.current = pag.current ?? 1
    pagination.value.pageSize = pag.pageSize ?? 10
    sort.value.field = sorter.field
    sort.value.order = sorter.order === 'descend' ? 'desc' : sorter.order === 'ascend' ? 'asc' : ''
    await execute()
  }

  return { loading: isFetching, pagination, list, handleTableChange }
}
