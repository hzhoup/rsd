<template>
  <div>
    <slot name="insertFooter"></slot>
    <a-button v-if="showCancelBtn" v-bind="cancelButtonProps" @click="handleCancel">
      {{ cancelText }}
    </a-button>
    <slot name="centerFooter"></slot>
    <a-button
      v-if="showOkBtn"
      :loading="confirmLoading"
      :type="okType"
      v-bind="okButtonProps"
      @click="handleOk"
    >
      {{ okText }}
    </a-button>
    <slot name="appendFooter"></slot>
  </div>
</template>

<script lang="ts" setup>
import { basicProps } from '../props'

defineProps(basicProps)
const emits = defineEmits(['ok', 'cancel'])

function handleOk(e: Event) {
  emits('ok', e)
}

function handleCancel(e: Event) {
  emits('cancel', e)
}
</script>
