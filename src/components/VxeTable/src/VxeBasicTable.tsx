// @ts-nocheck
import { pageQuery } from '@/components/VxeTable/src/queryMethods'
import { deepMerge } from '@/utils'
import { extendSlots } from '@/utils/common/tsxHelper'
import { omit } from 'lodash-es'
import { computed, defineComponent, ref } from 'vue'
import type {
  GridMethods,
  TableEditMethods,
  TableMethods,
  TableValidatorMethods,
  VxeGridEventProps,
  VxeGridInstance
} from 'vxe-table'
import { Grid as VxeGrid } from 'vxe-table'
import XEUtils from 'xe-utils'
import { ignorePropKeys } from './const'
import { basicEmits } from './emits'
import { gridComponentMethodKeys } from './methods'
import { basicProps } from './props'
import { BasicTableProps } from './types'

export default defineComponent({
  name: 'VxeBasicTable',
  props: basicProps,
  emits: basicEmits,
  setup(props, { emit, attrs }) {
    const instance = getCurrentInstance()
    const tableElRef = ref<VxeGridInstance>()
    const emitEvents: VxeGridEventProps = {}

    const extendTableMethods = methodKeys => {
      const funcs: any = {}
      methodKeys.forEach(name => {
        funcs[name] = (...args: any[]) => {
          const $vxegrid: any = tableElRef.value
          if ($vxegrid && $vxegrid[name]) {
            return $vxegrid[name](...args)
          }
        }
      })

      return funcs
    }

    const gridExtendTableMethods = extendTableMethods(gridComponentMethodKeys) as GridMethods &
      TableMethods &
      TableEditMethods &
      TableValidatorMethods

    basicEmits.forEach(name => {
      const type = XEUtils.camelCase(`on-${name}`) as keyof VxeGridEventProps

      emitEvents[type] = (...args: any[]) => emit(name, ...args)
    })

    /**
     * @description: 二次封装需要的所有属性
     *  1.部分属性需要和全局属性进行合并
     */
    const getBindValues = computed<BasicTableProps>(() => {
      const propsData: BasicTableProps = {
        ...attrs,
        ...props
      }

      const custom = {
        proxyConfig: {
          ajax: {
            query: e => {
              instance.data.selectRows = []
              tableElRef.value?.clearCheckboxRow()
              return pageQuery(e, props.url, props.query)
            }
          }
        }
      }

      return deepMerge(propsData, custom)
    })

    /**
     * @description: Table 所有属性
     */
    const getBindGridValues = computed(() => {
      const omitProps = omit(getBindValues.value, ignorePropKeys)

      return {
        ...omitProps,
        ...getBindGridEvent
      }
    })

    /**
     * @description: 组件外层class
     */
    const getWrapperClass = computed(() => {
      return [attrs.class]
    })

    /**
     * @description: 重写Vxe-table 方法
     */
    const getBindGridEvent: VxeGridEventProps = {
      ...emitEvents
    }

    return {
      getWrapperClass,
      getBindGridValues,
      tableElRef,
      ...gridExtendTableMethods
    }
  },
  data() {
    return {
      selectRows: []
    }
  },
  methods: {
    checked({ $table }) {
      this.selectRows = $table.getCheckboxRecords()
    },
    refresh(flag = true) {
      if (flag) this.tableElRef?.commitProxy('reload')
      else this.tableElRef?.commitProxy('query')
    }
  },
  render() {
    const { tableClass, tableStyle } = this.$props

    return (
      <div class={`h-full flex flex-col bg-white ${this.getWrapperClass}`}>
        <VxeGrid
          ref='tableElRef'
          class={`vxe-grid_scrollbar px-6 py-4 ${tableClass}`}
          style={tableStyle}
          {...this.getBindGridValues}
          onCheckboxAll={this.checked}
          onCheckboxChange={this.checked}
        >
          {extendSlots(this.$slots)}
        </VxeGrid>
      </div>
    )
  }
})
