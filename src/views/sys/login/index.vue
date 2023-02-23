<template>
  <div class="relative flex-center wh-full bg-[#f4f7f9]">
    <a-card class="rounded-20 shadow-sm">
      <div class="w-360px">
        <header class="flex-y-center justify-between">
          <IconCustomLogo class="text-64 color-primary" />
          <a-typography-text class="text-28" strong>{{ title }}</a-typography-text>
        </header>
        <main class="pt-24">
          <h3 class="text-18px text-primary font-medium">账密登录</h3>
          <div class="pt-12">
            <transition appear mode="out-in" name="fade-slide">
              <LoginForm />
            </transition>
          </div>
        </main>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/views/sys/login/modules/LoginForm.vue'

defineOptions({ name: 'Login' })

const title = import.meta.env.APP_TITLE
</script>
