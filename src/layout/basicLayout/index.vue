<template>
  <a-layout class="flex-col w-full min-w-full bg-[#f4f7f9] overflow-hidden">
    <LayoutHeader />
    <a-layout class="!min-h-full">
      <LayoutSideBar />
      <a-layout class="ml-1">
        <div class="h-48"></div>
        <!--        <LayoutBreadcrumb />-->
        <a-layout-content class="relative !flex-1" style="min-height: calc(100vh - 48px)">
          <AppContent />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import AppContent from '@/layout/common/AppContent.vue'
import LayoutHeader from '@/layout/common/LayoutHeader.vue'
import LayoutSideBar from '@/layout/common/LayoutSideBar.vue'

defineOptions({ name: 'BasicLayout' })
</script>
