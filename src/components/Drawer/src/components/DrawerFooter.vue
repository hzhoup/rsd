<template>
  <div v-if="showFooter || $slots.footer" :class="prefixCls" :style="getStyle">
    <template v-if="!$slots.footer">
      <slot name="insertFooter"></slot>
      <a-button v-if="showCancelBtn" class="mr-2" v-bind="cancelButtonProps" @click="handleClose">
        {{ cancelText }}
      </a-button>
      <slot name="centerFooter"></slot>
      <a-button
        v-if="showOkBtn"
        :type="okType"
        v-bind="okButtonProps"
        :loading="confirmLoading"
        class="mr-2"
        @click="handleOk"
      >
        {{ okText }}
      </a-button>
      <slot name="appendFooter"></slot>
    </template>

    <template v-else>
      <slot name="footer"></slot>
    </template>
  </div>
</template>
<script lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { footerProps } from '../props'

const prefixCls = 'rds-basic-drawer-footer'

export default defineComponent({
  name: 'BasicDrawerFooter',
  props: {
    ...footerProps,
    height: {
      type: String,
      default: '60px'
    }
  },
  emits: ['ok', 'close'],
  setup(props, { emit }) {
    const getStyle = computed((): CSSProperties => {
      const heightStr = `${props.height}`
      return {
        height: heightStr,
        lineHeight: `calc(${heightStr} - 1px)`
      }
    })

    function handleOk() {
      emit('ok')
    }

    function handleClose() {
      emit('close')
    }
    return { handleOk, prefixCls, handleClose, getStyle }
  }
})
</script>

<style lang="less">
@prefix-cls: ~'rds-basic-drawer-footer';
@footer-height: 60px;
.@{prefix-cls} {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 12px 0 20px;
  text-align: right;
  background-color: #fff;
  border-top: 1px solid #d9d9d9;

  > * {
    margin-right: 8px;
  }
}
</style>
