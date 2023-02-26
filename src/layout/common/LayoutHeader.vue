<template>
  <a-layout-header
    class="!flex-y-center !justify-between !p-0 !h-48 !leading-48 -ml-px text-white !bg-[#151515] fixed-lt z-500 w-full"
  >
    <div class="min-w-180 h-full flex-y-center">
      <SystemLogo class="hover:bg-hover_dark" />
    </div>
    <div class="h-full flex-1">
      <LayoutMenu is-horizontal theme="dark" />
    </div>
    <div class="flex-y-center min-2-180 h-full">
      <FullScreen />
      <RefreshPage />
      <UserMenu />
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import LayoutMenu from '@/components/Menus/LayoutMenu.vue'
import FullScreen from '@/layout/common/FullScreen.vue'
import RefreshPage from '@/layout/common/RefreshPage.vue'
import UserMenu from '@/layout/common/UserMenu.vue'
</script>
