<template>
  <a-form ref="formRef" :model="formData" :rules="formRules" @finish="handleLogin">
    <a-form-item name="userName">
      <a-input v-model:value="formData.userName" placeholder="用户名" size="large" />
    </a-form-item>
    <a-form-item name="password">
      <a-input-password v-model:value="formData.password" placeholder="密码" size="large" />
    </a-form-item>
    <a-form-item>
      <a-button :loading="isFetching" block html-type="submit" size="large" type="primary">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { useLoginForm } from '@/views/sys/login/modules/useLoginForm'

const formRef = ref(null)
const { formData, formRules, handleLogin, isFetching } = useLoginForm(formRef)
</script>
