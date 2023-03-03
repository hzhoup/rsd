<template>
  <a-tree-select
    :field-names="{ label: 'deptName', value: 'id' }"
    :tree-data="data"
    :value="value"
    allow-clear
    placeholder="请选择部门"
    show-search
    tree-default-expand-all
    v-bind="attrs"
    @change="selectDept"
  />
</template>

<script lang="ts" setup>
import { useGet } from '@/hooks/useRequest'

interface Props {
  value: number | null
}

const attrs = useAttrs()
defineProps<Props>()
const emits = defineEmits(['update:value'])

const { execute, data } = useGet('/dept/getList')

onMounted(async () => {
  await execute()
})

function selectDept(value) {
  emits('update:value', value)
}
</script>
