import { VXETable } from 'vxe-table'

VXETable.setup({
  table: {
    headerAlign: 'center',
    showOverflow: 'tooltip',
    border: true,
    stripe: true,
    columnConfig: {
      resizable: true
    },
    rowConfig: {
      isCurrent: true,
      isHover: true
    },
    emptyRender: {
      name: 'AEmpty'
    },
    printConfig: {},
    exportConfig: {},
    customConfig: {
      storage: true
    }
  },
  grid: {
    toolbarConfig: {
      enabled: true,
      export: true,
      zoom: true,
      print: true,
      refresh: true,
      custom: true
    },
    pagerConfig: {
      pageSizes: [10, 20, 50, 100, 200, 500],
      pageSize: 10,
      autoHidden: true,
      perfect: true,
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
      align: 'right'
    },
    proxyConfig: {
      form: true,
      props: {
        result: 'items',
        total: 'total'
      }
    },
    zoomConfig: {}
  }
})
