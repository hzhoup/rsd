import { VXETable } from 'vxe-table'
// @ts-ignore
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginAntd from './src/components'
import './src/setting'

export * from 'vxe-table'
export * from './src/types'

VXETable.use(VXETablePluginAntd).use(VXETablePluginExportXLSX)
