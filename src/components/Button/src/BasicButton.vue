<template>
  <Button :class="getButtonClass" v-bind="getBindValue" @click="onClick">
    <template #default="data">
      <slot name="preIcon" />
      <slot v-bind="data || {}"></slot>
      <slot name="postIcon" />
    </template>
  </Button>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AButton',
  extends: Button,
  inheritAttrs: false
})
</script>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { buttonProps } from './props'
import { useAttrs } from '@/hooks/useAttrs'

const props = defineProps(buttonProps)

const attrs = useAttrs({ excludeDefaultKeys: false })
const getButtonClass = computed(() => {
  const { color, disabled } = props
  return [
    {
      [`ant-btn-${color}`]: !!color,
      [`is-disabled`]: disabled
    }
  ]
})

const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>
