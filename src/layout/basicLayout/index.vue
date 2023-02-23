<template>
  <a-layout>
    <LayoutHeader />
    <AppContent />
  </a-layout>
</template>

<script lang="ts" setup>
import AppContent from '@/layout/common/AppContent.vue'
import LayoutHeader from '@/layout/common/LayoutHeader.vue'

defineOptions({ name: 'BasicLayout' })
</script>
