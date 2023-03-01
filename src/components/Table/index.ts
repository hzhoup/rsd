import type { App } from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import 'xe-utils'
import './helpers/format'
import './helpers/renderer'

export function setupVxeTable(app: App) {
  app.use(VXETable)
}
