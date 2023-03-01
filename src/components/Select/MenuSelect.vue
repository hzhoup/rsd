<template>
  <a-tree-select
    :field-names="{ label: 'name', value: 'id' }"
    :tree-data="list"
    :value="value"
    allow-clear
    placeholder="请选择菜单"
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

const list = reactive<Recordable[]>([{ name: '根目录', id: -1, children: [] }])
const { execute, data } = useGet<Recordable[]>('/menu/getList')

onMounted(async () => {
  await execute()
  list[0].children = data.value
})

function selectDept(value) {
  console.log(value)
  emits('update:value', value)
}
</script>
