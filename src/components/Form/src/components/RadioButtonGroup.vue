<template>
  <a-radio-group v-model:value="state" button-style="solid" v-bind="attrs">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <a-radio-button :disabled="item.disabled" :value="item.value" @click="handleClick(item)">
        {{ item.label }}
      </a-radio-button>
    </template>
  </a-radio-group>
</template>
<script lang="ts">
import { useRuleFormItem } from '@/hooks/components/useFormItem'
import { useAttrs } from '@/hooks/core/useAttrs'
import { computed, defineComponent, PropType, ref } from 'vue'
import { isString } from 'xe-utils'

type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean }
type RadioItem = string | OptionsItem

export default defineComponent({
  name: 'RadioButtonGroup',
  props: {
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>
    },
    options: {
      type: Array as PropType<RadioItem[]>,
      default: () => []
    }
  },
  emits: ['change'],
  setup(props) {
    const attrs = useAttrs()
    const emitData = ref<any[]>([])
    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props, 'value', 'change', emitData)

    // Processing options value
    const getOptions = computed((): OptionsItem[] => {
      const { options } = props
      if (!options || options?.length === 0) return []

      const isStringArr = options.some(item => isString(item))
      if (!isStringArr) return options as OptionsItem[]

      return options.map(item => ({ label: item, value: item })) as OptionsItem[]
    })

    function handleClick(...args) {
      emitData.value = args
    }

    return { state, getOptions, attrs, handleClick }
  }
})
</script>
