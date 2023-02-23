<template>
  <div class="fixed-center flex-col">
    <IconCustomLogo class="text-128" />
    <div class="wh-56 my-36">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in lodingClasses"
          :key="index"
          :class="item"
          class="absolute wh-16 bg-primary rounded-8 animate-pulse"
        ></div>
      </div>
    </div>
    <h2 class="text-28 font-500 text-#646464">{{ title }}</h2>
  </div>
</template>

<script lang="ts" setup>
const title = import.meta.env.APP_TITLE

const lodingClasses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500'
]
</script>
