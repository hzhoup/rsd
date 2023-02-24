<template>
  <HoverContainer :tooltip-content="getTip" class="h-full" mode="dark" @click="toggle">
    <IconAntDesignFullscreenOutlined v-if="!isFullscreen" class="text-16 text-white" />
    <IconAntDesignFullscreenExitOutlined v-else class="text-16 text-white" />
  </HoverContainer>
</template>

<script lang="ts" setup>
const { toggle, isFullscreen } = useFullscreen()

const getTip = computed(() => {
  return unref(isFullscreen) ? '退出全屏' : '全屏'
})
</script>
