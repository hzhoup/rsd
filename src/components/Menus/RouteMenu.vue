<template>
  <template v-if="menu.children?.length">
    <a-sub-menu
      :key="menu.url"
      :class="[theme === 'dark' ? '!hover:bg-hover_dark' : '!hover:bg-hover_light']"
      :title="menu.name"
    >
      <template v-for="child of menu.children" :key="child.id">
        <RouteMenu :menu="child" />
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item
      :key="menu.url"
      :class="[theme === 'dark' ? '!hover:bg-hover_dark' : '!hover:bg-hover_light']"
      class="!flex-y-center"
    >
      <template v-if="menu.icon" #icon>
        <component :is="MenuIconList[menu.icon]" />
      </template>
      <span>{{ menu.name }}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts" setup>
import MenuIconList from './icons'

defineProps({
  menu: {
    type: Object,
    default: () => ({})
  },
  theme: {
    type: String,
    default: 'light'
  }
})
</script>
