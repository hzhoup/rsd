<template>
  <a-layout-header
    class="w-full !flex-y-center !justify-between !p-0 !h-48 !bg-[#151515] !leading-48"
  >
    <div class="min-w-180 h-full flex-y-center">
      <SystemLogo class="hover:bg-hover_dark" />
    </div>
    <div class="h-full flex-1">
      <LayoutMenu theme="dark" is-horizontal />
    </div>
    <div class="flex-y-center min-2-180 h-full">
      <FullScreen />
      <RefreshPage />
      <UserMenu />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import LayoutMenu from '@/components/Menus/LayoutMenu.vue'
import FullScreen from '@/layout/common/FullScreen.vue'
import RefreshPage from '@/layout/common/RefreshPage.vue'
import UserMenu from '@/layout/common/UserMenu.vue'
</script>
