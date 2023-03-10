<template>
  <a-col v-if="showActionButtonGroup" v-bind="actionColOpt">
    <div :style="{ textAlign: actionColOpt.style.textAlign }" style="width: 100%">
      <a-form-item>
        <slot name="resetBefore"></slot>
        <a-button
          v-if="showResetButton"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
        >
          {{ getResetBtnOptions.text }}
        </a-button>
        <slot name="submitBefore"></slot>

        <a-button
          v-if="showSubmitButton"
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
        >
          {{ getSubmitBtnOptions.text }}
        </a-button>

        <slot name="advanceBefore"></slot>
        <a-button
          v-if="showAdvancedButton && !hideAdvanceBtn"
          type="link"
          size="small"
          @click="toggleAdvanced"
        >
          {{ isAdvanced ? '收起' : '展开' }}
          <BasicArrow :expand="!isAdvanced" class="ml-1" up />
        </a-button>
        <slot name="advanceAfter"></slot>
      </a-form-item>
    </div>
  </a-col>
</template>
<script lang="ts">
import { BasicArrow } from '@/components/Application'
import { propTypes } from '@/utils/propTypes'
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import { computed, defineComponent, PropType } from 'vue'
import { useFormContext } from '../hooks/useFormContext'
import type { ColEx } from '../types/index'

type ButtonOptions = Partial<ButtonProps> & { text: string }

export default defineComponent({
  name: 'BasicFormAction',
  components: { BasicArrow },
  props: {
    showActionButtonGroup: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showAdvancedButton: propTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({})
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({})
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({})
    },
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool
  },
  emits: ['toggle-advanced'],
  setup(props, { emit }) {
    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props
      const actionSpan = 24 - span
      const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {}
      const actionColOpt: Partial<ColEx> = {
        style: { textAlign: 'right' },
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions
      }
      return actionColOpt
    })

    const getResetBtnOptions = computed((): ButtonOptions => {
      return Object.assign(
        {
          text: '重置'
        },
        props.resetButtonOptions
      )
    })

    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          text: '提交'
        },
        props.submitButtonOptions
      )
    })

    function toggleAdvanced() {
      emit('toggle-advanced')
    }

    return {
      actionColOpt,
      getResetBtnOptions,
      getSubmitBtnOptions,
      toggleAdvanced,
      ...useFormContext()
    }
  }
})
</script>
