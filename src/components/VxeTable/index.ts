import { withInstall } from '@/utils'
import { App } from 'vue'
import VXETable, { VXETable as VXETableI } from 'vxe-table'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginAntd from './src/components'
import './src/setting'
import vxeBasicTable from './src/VxeBasicTable'

export * from 'vxe-table'
export * from './src/types'
export const VxeBasicTable = withInstall(vxeBasicTable)

VXETableI.use(VXETablePluginAntd).use(VXETablePluginExportXLSX)

export function setupVxeTable(app: App) {
  app.use(VXETable)
}
