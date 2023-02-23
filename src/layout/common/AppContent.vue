<template>
  <div
    v-loading="appStore.pageLoading"
    class="wh-full bg-[#f6f9f8] transition duration-300 ease-in-out"
    loading-size="large"
  >
    <router-view v-slot="{ Component, route }">
      <transition appear mode="out-in" name="fade-slide">
        <keep-alive :include="userStore.cacheRoutes">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

defineOptions({ name: 'AppContent' })
const userStore = useUserStore()
const appStore = useAppStore()
</script>
