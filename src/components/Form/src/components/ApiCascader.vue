<template>
  <a-cascader
    v-model:value="state"
    :display-render="handleRenderDisplay"
    :load-data="loadData"
    change-on-select
    :options="options"
    @change="handleChange"
  >
    <template v-if="loading" #suffixIcon>
      <LoadingOutlined spin />
    </template>
    <template v-if="loading" #notFoundContent>
      <span>
        <LoadingOutlined class="mr-1" spin />
        请等待数据加载完成...
      </span>
    </template>
  </a-cascader>
</template>
<script lang="ts">
import { useRuleFormItem } from '@/hooks/components/useFormItem'
import { propTypes } from '@/utils/propTypes'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { get, isFunction, omit } from 'lodash-es'
import { defineComponent, PropType, ref, unref, watch, watchEffect } from 'vue'

interface Option {
  value: string
  label: string
  loading?: boolean
  isLeaf?: boolean
  children?: Option[]
}
export default defineComponent({
  name: 'ApiCascader',
  components: { LoadingOutlined },
  props: {
    value: {
      type: Array
    },
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<Option[]>>,
      default: null
    },
    numberToString: propTypes.bool,
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    childrenField: propTypes.string.def('children'),
    asyncFetchParamKey: propTypes.string.def('parentCode'),
    immediate: propTypes.bool.def(true),
    // init fetch params
    initFetchParams: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    // 是否有下级，默认是
    isLeaf: {
      type: Function as PropType<(arg: Recordable) => boolean>,
      default: null
    },
    displayRenderArray: {
      type: Array
    }
  },
  emits: ['change', 'defaultChange'],
  setup(props, { emit }) {
    const apiData = ref<any[]>([])
    const options = ref<Option[]>([])
    const loading = ref<boolean>(false)
    const emitData = ref<any[]>([])
    const isFirstLoad = ref(true)

    const [state] = useRuleFormItem(props, 'value', 'change', emitData)

    watch(
      apiData,
      data => {
        options.value = generatorOptions(data)
      },
      { deep: true }
    )

    function generatorOptions(options: any[]): Option[] {
      const { labelField, valueField, numberToString, childrenField, isLeaf } = props
      return options.reduce((prev, next: Recordable) => {
        if (next) {
          const value = next[valueField]
          const item = {
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: numberToString ? `${value}` : value,
            isLeaf: isLeaf && typeof isLeaf === 'function' ? isLeaf(next) : false
          }
          const children = Reflect.get(next, childrenField)
          if (children) {
            Reflect.set(item, childrenField, generatorOptions(children))
          }
          prev.push(item)
        }
        return prev
      }, [] as Option[])
    }

    async function initialFetch() {
      const api = props.api
      if (!api || !isFunction(api)) return
      apiData.value = []
      loading.value = true
      try {
        const res = await api(props.initFetchParams)
        if (Array.isArray(res)) {
          apiData.value = res
          return
        }
        if (props.resultField) {
          apiData.value = get(res, props.resultField) || []
        }
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
      }
    }

    async function loadData(selectedOptions: Option[]) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true

      const api = props.api
      if (!api || !isFunction(api)) return
      try {
        const res = await api({
          [props.asyncFetchParamKey]: Reflect.get(targetOption, 'value')
        })
        if (Array.isArray(res)) {
          targetOption.children = generatorOptions(res)
          return
        }
        if (props.resultField) {
          targetOption.children = generatorOptions(get(res, props.resultField) || [])
        }
      } catch (e) {
        console.error(e)
      } finally {
        targetOption.loading = false
      }
    }

    watchEffect(() => {
      props.immediate && initialFetch()
    })

    watch(
      () => props.initFetchParams,
      () => {
        !unref(isFirstLoad) && initialFetch()
      },
      { deep: true }
    )

    function handleChange(keys, args) {
      emitData.value = args
      emit('defaultChange', keys, args)
    }

    function handleRenderDisplay({ labels, selectedOptions }) {
      if (unref(emitData).length === selectedOptions.length) {
        return labels.join(' / ')
      }
      if (props.displayRenderArray) {
        return props.displayRenderArray.join(' / ')
      }
      return ''
    }

    return {
      state,
      options,
      loading,
      handleChange,
      loadData,
      handleRenderDisplay
    }
  }
})
</script>
