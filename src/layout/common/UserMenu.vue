<template>
  <HoverContainer class="h-full" mode="dark">
    <a-dropdown>
      <div class="text-white flex-y-center gap-x-8">
        <a-avatar size="small" src="" />
        <span>用户名</span>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item>修改密码</a-menu-item>
          <a-menu-item>退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </HoverContainer>
</template>
