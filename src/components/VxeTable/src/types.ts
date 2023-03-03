import { Fn } from 'types'
import { CSSProperties } from 'vue'
import { VxeGridInstance, VxeGridProps } from 'vxe-table'

export type BasicTableProps = VxeGridProps & {
  tableClass?: string
  tableStyle?: CSSProperties
}

type CustomVxeGrid = {
  selectRows: Recordable[]
  refresh: Fn
}

export type VxeBasicInstance = VxeGridInstance & CustomVxeGrid
