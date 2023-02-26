<template>
  <div
    :style="{ width: collapsed ? `18px` : `200px` }"
    class="overflow-hidden"
    style="transition: all 0.2s ease 0s"
  ></div>
  <div
    class="flex items-stretch transition-all duration-250 ease fixed left-0 top-48 z-510 h-[calc(100%-48px)] w-200 min-w-200 max-w-200"
  >
    <a-layout-sider v-model:collapsed="collapsed" class="!bg-white" collapsed-width="0" width="180">
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
