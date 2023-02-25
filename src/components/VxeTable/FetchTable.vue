<template>
  <vxe-grid v-bind="attrs">
    <slot />
  </vxe-grid>
</template>

<script lang="ts" setup>
import { useGet } from '@/hooks/useRequest'
import { VxeGridProps } from 'vxe-table'

interface Props {
  url: string
}

const props = defineProps<Props>()
const params = ref({})
const { execute, data, isFetching } = useGet(props.url, params)

const gridOptions = reactive<VxeGridProps>({
  loading: isFetching.value,
  resizable: true,
  autoResize: true,
  headerAlign: 'center',
  highlightCurrentRow: true,
  highlightHoverRow: true,
  showOverflow: 'tooltip',
  pagerConfig: {
    pageSize: 10
  },
  proxyConfig: {
    seq: true,
    sort: true,
    form: true,
    message: false,
    props: {
      list: 'data.data',
      result: 'data.data',
      total: 'data.totalCount'
    },
    ajax: {
      query: queryTable
    }
  }
})
const _attrs = useAttrs()
const attrs = computed(() => ({ ...gridOptions, ..._attrs }))

function queryTable({ page, form, sort }) {
  return new Promise(async resolve => {
    params.value = {
      ...form,
      pageNo: page.currentPage,
      pageSize: page.pageSize,
      field: sort.field,
      order: sort.order
    }
    await execute()
    resolve(data.value)
  })
}
</script>
