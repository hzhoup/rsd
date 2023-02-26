<template>
  <div
    class="h-60 -ml-px z-505 fixed top-48 right-0 w-[calc(100%-210px)] transition-width duration-200"
  >
    <div class="h-48 p-12 bg-white">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="breadcrumb in userStore.breadcrumbs" :key="breadcrumb">
          {{ breadcrumb }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
</script>

<style scoped></style>
