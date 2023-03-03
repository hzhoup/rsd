<template>
  <a-radio-group v-model:value="state" button-style="solid" v-bind="attrs">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <a-radio-button
        v-if="props.isBtn"
        :value="item.value"
        :disabled="item.disabled"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </a-radio-button>
      <a-radio v-else :disabled="item.disabled" :value="item.value" @click="handleClick(item)">
        {{ item.label }}
      </a-radio>
    </template>
  </a-radio-group>
</template>
<script lang="ts">
import { useRuleFormItem } from '@/hooks/components/useFormItem'
import { useAttrs } from '@/hooks/core/useAttrs'
import { propTypes } from '@/utils/propTypes'
import { get, isFunction, omit } from 'lodash-es'
import { computed, defineComponent, PropType, ref, unref, watch, watchEffect } from 'vue'

type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean }

export default defineComponent({
  name: 'ApiRadioGroup',
  props: {
    api: {
      type: Function as PropType<(arg?: Recordable | string) => Promise<OptionsItem[]>>,
      default: null
    },
    params: {
      type: [Object, String] as PropType<Recordable | string>,
      default: () => ({})
    },
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>
    },
    isBtn: {
      type: [Boolean] as PropType<boolean>,
      default: false
    },
    numberToString: propTypes.bool,
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true)
  },
  emits: ['options-change', 'change'],
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
            label: next[labelField],
            value: numberToString ? `${value}` : value,
            ...omit(next, [labelField, valueField])
          })
        }
        return prev
      }, [] as OptionsItem[])
    })

    watchEffect(() => {
      props.immediate && fetch()
    })

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

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    function handleClick(...args) {
      emitData.value = args
    }

    return { state, getOptions, attrs, loading, handleClick, props }
  }
})
</script>
