<template>
  <div class="flex-y-center transition-all duration-250 ease">
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="!bg-white min-h-[calc(100vh-48px)]"
      collapsed-width="0"
      width="180"
    >
      <LayoutMenu />
    </a-layout-sider>
    <span
      class="h-full w-18 flex-center cursor-pointer hover:bg-hover_light"
      @click="toggleCollapsed()"
    >
      <span class="text-14">
        <IconAntDesignLeftOutlined v-if="!collapsed" />
        <IconAntDesignRightOutlined v-else />
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import LayoutMenu from '@/components/Menus/LayoutMenu.vue'

const [collapsed, toggleCollapsed] = useToggle()
</script>
