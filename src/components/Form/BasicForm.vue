<template>
  <a-form v-bind="getBindValue"></a-form>
</template>

<script lang="ts" setup>
import { basicProps } from './props'

const props = defineProps(basicProps)
const propsRef = ref<Partial<FormProps>>({})

const getBindValue = computed(() => ({ ...props }))
</script>

<style scoped></style>
