<template>
  <div
    class="flex-y-center cursor-pointer transition-all duration-200 ease px-8 wh-full"
    @click="goHome"
  >
    <img src="../../assets/img/logo.png" :style="{ width: `${size}px`, height: `${size}px` }" />
    <div
      v-show="showTitle"
      class="ml-4 truncate text-16 font-bold transition-all duration-500 leading-normal"
      :style="{ color: theme === 'dark' ? 'white' : '#333' }"
    >
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouterPush } from '@/hooks/useRouterPush'

defineProps({
  size: { type: Number, default: 32 },
  theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v), default: 'dark' },
  showTitle: { type: Boolean, default: true }
})

const title = import.meta.env.APP_TITLE
const { goHome } = useRouterPush()
</script>
