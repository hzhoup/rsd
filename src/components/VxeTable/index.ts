import { App } from 'vue'
import VXETable, { VXETable as VXETableI } from 'vxe-table'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import 'vxe-table/lib/style.css'
import VXETablePluginAntd from './src/components'
import './src/setting'

export * from 'vxe-table'
export * from './src/types'

VXETableI.use(VXETablePluginAntd).use(VXETablePluginExportXLSX)

export function setupVxeTable(app: App) {
  app.use(VXETable)
}
