<template>
  <BasicTitle :help-message="helpMessage">
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalHeader',
  props: {
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    },
    title: { type: String, default: '' }
  },
  emits: ['dblclick']
})
</script>
