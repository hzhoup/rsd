<template>
  <a-select
    v-model:value="state"
    :options="getOptions"
    v-bind="$attrs"
    @change="handleChange"
    @dropdown-visible-change="handleFetch"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template v-if="loading" #suffixIcon>
      <LoadingOutlined spin />
    </template>
    <template v-if="loading" #notFoundContent>
      <span>
        <LoadingOutlined class="mr-1" spin />
        请等待数据加载完成...
      </span>
    </template>
  </a-select>
</template>
<script lang="ts">
import { useRuleFormItem } from '@/hooks/components/useFormItem'
import { useAttrs } from '@/hooks/core/useAttrs'
import { propTypes } from '@/utils/propTypes'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { get, isFunction, omit } from 'lodash-es'
import { computed, defineComponent, PropType, ref, unref, watch, watchEffect } from 'vue'

type OptionsItem = { label: string; value: string; disabled?: boolean }

export default defineComponent({
  name: 'ApiSelect',
  components: {
    LoadingOutlined
  },
  inheritAttrs: false,
  props: {
    value: [Array, Object, String, Number],
    numberToString: propTypes.bool,
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
      default: null
    },
    // api params
    params: propTypes.any.def({}),
    // support xxx.xxx.xx
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true),
    alwaysLoad: propTypes.bool.def(false)
  },
  emits: ['options-change', 'change', 'update:value'],
  setup(props, { emit }) {
    const options = ref<OptionsItem[]>([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    const emitData = ref<any[]>([])
    const attrs = useAttrs()

    const [state] = useRuleFormItem(props, 'value', 'change', emitData)

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props

      return unref(options).reduce((prev, next: Recordable) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: numberToString ? `${value}` : value
          })
        }
        return prev
      }, [] as OptionsItem[])
    })

    watchEffect(() => {
      props.immediate && !props.alwaysLoad && fetch()
    })

    watch(
      () => state.value,
      v => {
        emit('update:value', v)
      }
    )

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true }
    )

    async function fetch() {
      const api = props.api
      if (!api || !isFunction(api)) return
      options.value = []
      try {
        loading.value = true
        const res = await api(props.params)
        if (Array.isArray(res)) {
          options.value = res
          emitChange()
          return
        }
        if (props.resultField) {
          options.value = get(res, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
      }
    }

    async function handleFetch(visible) {
      if (visible) {
        if (props.alwaysLoad) {
          await fetch()
        } else if (!props.immediate && unref(isFirstLoad)) {
          await fetch()
          isFirstLoad.value = false
        }
      }
    }

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    function handleChange(_, ...args) {
      emitData.value = args
    }

    return { state, attrs, getOptions, loading, handleFetch, handleChange }
  }
})
</script>
