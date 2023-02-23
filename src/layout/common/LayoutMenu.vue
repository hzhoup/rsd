<template>
  <AppMenu />
</template>

<script lang="tsx" setup>
import { Menu } from 'ant-design-vue'

const MenuItem = Menu.Item

interface Props {
  theme: 'light' | 'dark'
  isHorizontal: boolean
}
const props = defineProps<Props>()

function renderMenu() {
  return (
    <Menu mode={props.isHorizontal ? 'horizontal' : 'vertical'} theme={props.theme}>
      <MenuItem key={1}>work</MenuItem>
    </Menu>
  )
}

const AppMenu = () => {
  return renderMenu()
}
</script>
