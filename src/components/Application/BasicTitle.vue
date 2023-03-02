<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp v-if="helpMessage" :class="`${prefixCls}-help`" :text="helpMessage" />
  </span>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, useSlots } from 'vue'
import BasicHelp from './BasicHelp.vue'

const prefixCls = 'rds-basic-title'

const props = defineProps({
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  span: { type: Boolean },
  normal: { type: Boolean }
})
const slots = useSlots()
const getClass = computed(() => [
  prefixCls,
  { [`${prefixCls}-show-span`]: props.span && slots.default },
  { [`${prefixCls}-normal`]: props.normal }
])
</script>

<style lang="less" scoped>
@prefix-cls: ~'rds-basic-title';

.@{prefix-cls} {
  position: relative;
  display: flex;
  padding-left: 7px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #333;
  cursor: pointer;
  user-select: none;

  &-normal {
    font-size: 14px;
    font-weight: 500;
  }

  &-show-span::before {
    position: absolute;
    top: 4px;
    left: 0;
    width: 3px;
    height: 16px;
    margin-right: 4px;
    background-color: #1890ff;
    content: '';
  }

  &-help {
    margin-left: 10px;
  }
}
</style>
