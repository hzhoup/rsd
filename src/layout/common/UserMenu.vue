<template>
  <HoverContainer class="h-full" mode="dark">
    <a-dropdown>
      <div class="text-white flex-y-center gap-x-8">
        <a-avatar :src="userStore.userInfo.avatar" size="small" />
        <span>{{ userStore.userInfo.realName }}</span>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="updatePwd">修改密码</a-menu-item>
          <a-menu-item @click="showModal">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </HoverContainer>
  <UpdatePwdModal ref="updatePwdModal" />
</template>

<script lang="ts" setup>
import { PageNameEnum } from '@/enum/page'
import UpdatePwdModal from '@/layout/common/UpdatePwdModal.vue'
import { useUserStore } from '@/store/modules/user'
import { Modal } from 'ant-design-vue'

const userStore = useUserStore()
const router = useRouter()

function showModal() {
  Modal.confirm({
    title: `是否确认退出${import.meta.env.APP_TITLE}?`,
    onOk: logout,
    cancelText: '取消'
  })
}

async function logout() {
  await userStore.logout()
  setTimeout(() => {
    router.push({ name: PageNameEnum.LOGIN_NAME })
  }, 150)
}

const updatePwdModal = ref()

function updatePwd() {
  updatePwdModal.value?.open()
}
</script>
