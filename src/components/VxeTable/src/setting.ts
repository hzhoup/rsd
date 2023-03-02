import { VXETable } from 'vxe-table'

VXETable.setup({
  table: {
    border: true,
    stripe: true,
    columnConfig: {
      resizable: true,
      isCurrent: true,
      isHover: true
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
      pageSizes: [20, 50, 100, 500],
      pageSize: 20,
      autoHidden: true
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
