<template>
  <a-layout-header class="w-full !flex-y-center !justify-between !p-0 !h-48">
    <div class="min-w-180 h-full flex-y-center">
      <SystemLogo class="hover:bg-hover_dark" />
    </div>
    <div class="h-full flex-1">
      <LayoutMenu theme="dark" is-horizontal />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import LayoutMenu from '@/layout/common/LayoutMenu.vue'
</script>
