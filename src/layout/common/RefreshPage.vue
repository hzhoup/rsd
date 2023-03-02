<template>
  <HoverContainer class="h-full" mode="dark" tooltip-content="重新加载" @click="handleRefresh">
    <IconAntDesignRedoOutlined
      :class="{ 'animate-spin': appStore.pageLoading }"
      class="text-16 text-white"
    />
  </HoverContainer>
</template>

<script lang="ts" setup>
import { HoverContainer } from '@/components/Application'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

function handleRefresh() {
  appStore.reloadPage()
  setTimeout(() => {
    appStore.reloadFlag = false
  }, 800)
}
</script>
