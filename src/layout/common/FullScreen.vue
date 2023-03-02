<template>
  <HoverContainer :tooltip-content="getTip" class="h-full" mode="dark" @click="toggle">
    <FullscreenOutlined v-if="!isFullscreen" class="text-16 !text-white" />
    <FullscreenExitOutlined v-else class="text-16 !text-white" />
  </HoverContainer>
</template>

<script lang="ts" setup>
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'

const { toggle, isFullscreen } = useFullscreen()

const getTip = computed<string>(() => {
  return unref(isFullscreen) ? '退出全屏' : '全屏'
})
</script>
