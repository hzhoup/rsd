<template>
  <div v-loading="appStore.pageLoading" class="pr-18 py-18 h-full">
    <router-view v-slot="{ Component, route }">
      <transition appear mode="out-in" name="fade-slide">
        <component :is="Component" v-if="!appStore.reloadFlag" :key="route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app'

defineOptions({ name: 'AppContent' })
const appStore = useAppStore()
</script>
