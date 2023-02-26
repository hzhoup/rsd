<template>
  <a-menu
    :mode="isHorizontal ? 'horizontal' : 'inline'"
    :selected-keys="selectedKeys"
    :theme="theme"
    class="w-full !leading-inherit !bg-transparent"
    @click="handleClick"
  >
    <template v-for="menu in menus" :key="menu.id">
      <RouteMenu :menu="menu" :theme="theme" />
    </template>
  </a-menu>
</template>

<script lang="tsx" setup>
import { useRouterPush } from '@/hooks/useRouterPush'
import { useUserStore } from '@/store/modules/user'
import { list2tree } from '@/utils/common/tree'

interface Props {
  theme?: 'dark' | 'light'
  isHorizontal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  isHorizontal: false
})

const userStore = useUserStore()
const { routerPush } = useRouterPush()

const headerMenus = () => {
  return unref(userStore.userMenus).filter(menu => menu.level === 0)
}
const sideMenus = () => {
  const childMenu = unref(userStore.userMenus).filter(menu => menu.level !== 0)
  return list2tree(childMenu)
}
const menus = props.isHorizontal ? headerMenus() : sideMenus()

const selectedKeys = computed(() => {
  return props.isHorizontal ? userStore.headerMenuKeys : userStore.sideMenuKeys
})

function handleClick({ key }) {
  routerPush({ path: key })
}
</script>
