<template>
  <a-result status="404" sub-title="抱歉, 您访问的页面不存在">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="goHome">首页</a-button>
        <a-button @click="routerBack">上一页</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
import { useRouterPush } from '@/hooks/useRouterPush'

defineOptions({ name: 'Exception' })
const { goHome, routerBack } = useRouterPush()
</script>
