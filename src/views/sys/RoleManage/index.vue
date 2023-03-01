<template>
  <a-card>
    <RoleList />
  </a-card>
</template>

<script lang="ts" setup>
import RoleList from '@/views/sys/RoleManage/modules/RoleList.vue'

defineOptions({ name: 'RoleManage' })
</script>
