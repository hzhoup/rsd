import { useGet } from '@/hooks/useRequest'
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
import type { VxeGridInstance, VxeGridProps } from 'vxe-table'
import { Grid } from 'vxe-table'

export default defineComponent({
  props: {
    url: { type: String, required: true },
    items: { type: Array, default: () => [] }
  },
  setup(props, ctx) {
    const { slots, attrs, emit } = ctx
    console.log(props, slots, emit)

    const list = ref<Recordable[]>([])
    const xTable = ref<VxeGridInstance>()
    const refresh = (flag = false) => {
      if (flag) xTable.value?.commitProxy('reload')
      else xTable.value?.commitProxy('query')
    }

    const queryParams = ref<Recordable>({})
    const { execute, data, isFetching } = useGet<Recordable>(props.url, queryParams)
    const vxeProps = reactive<VxeGridProps>({
      size: 'medium',
      stripe: true,
      resizable: true,
      autoResize: true,
      headerAlign: 'center',
      highlightCurrentRow: true,
      highlightHoverRow: true,
      showOverflow: 'tooltip',
      loading: isFetching as unknown as boolean,
      toolbarConfig: {
        refresh: true,
        zoom: true,
        custom: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      pagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: 'right',
        pageSizes: [10, 20, 50, 100, 200, 500],
        layouts: [
          'Sizes',
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'FullJump',
          'Total'
        ],
        perfect: true
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
          query
        }
      },
      formConfig: {
        titleColon: true,
        preventSubmit: true,
        span: 6,
        items: []
      }
    })

    function query({ page, sort, form }) {
      return new Promise(async resolve => {
        queryParams.value = Object.assign({}, form)
        queryParams.value.pageNo = page.currentPage
        queryParams.value.pageSize = page.pageSize
        if (sort.field) {
          queryParams.value.field = sort.field
          queryParams.value.order = sort.order
        }
        await execute()
        list.value = (data.value?.data as unknown as Recordable[]) || []
        resolve(unref(data))
      })
    }

    const getGridProps = computed<VxeGridProps>(() => {
      return { ...vxeProps, ...attrs }
    })

    watch(
      () => props.items,
      newValue => {
        if (vxeProps.formConfig)
          vxeProps.formConfig.items = [
            ...newValue,
            { slots: { default: 'submit_item' } }
          ] as Recordable[]
      },
      { immediate: true }
    )

    ctx.expose({ refresh, xTable, list })

    return () => (
      <Grid
        ref={xTable}
        {...getGridProps.value}
        v-slots={{
          ...slots,
          submit_item: () => (
            <Button type='primary' onClick={() => refresh(true)}>
              查询
            </Button>
          )
        }}
      ></Grid>
    )
  }
})
