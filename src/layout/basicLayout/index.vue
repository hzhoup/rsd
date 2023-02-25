<template>
  <a-layout>
    <LayoutHeader />
    <a-layout>
      <LayoutSideBar />
      <a-layout-content>
        <AppContent />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import AppContent from '@/layout/common/AppContent.vue'
import LayoutHeader from '@/layout/common/LayoutHeader.vue'
import LayoutSideBar from '@/layout/common/LayoutSideBar.vue'

defineOptions({ name: 'BasicLayout' })
</script>
