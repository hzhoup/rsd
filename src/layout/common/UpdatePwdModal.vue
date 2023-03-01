<template>
  <a-modal
    v-model:visible="visible"
    :confirm-loading="loading"
    :destroy-on-close="true"
    title="修改密码"
    @cancel="cancel"
    @ok="handleOk"
  >
    <a-form ref="formRef" :label-col="{ span: 6 }" :model="formState" name="updatePwd">
      <a-form-item
        :rules="[
          { required: true, message: '请输入原密码' },
          { min: 6, max: 16, message: '密码长度在6到16位之间' }
        ]"
        label="原密码"
        name="oldPassword"
      >
        <a-input-password v-model:value="formState.oldPassword" placeholder="请输入原密码" />
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: '请输入新密码' },
          { min: 6, max: 16, message: '密码长度在6到16位之间' }
        ]"
        label="新密码"
        name="newPassword"
      >
        <a-input-password v-model:value="formState.newPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item :rules="[{ validator }]" label="确认新密码" name="rePassword">
        <a-input-password v-model:value="formState.rePassword" placeholder="请确认新密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { usePost } from '@/hooks/useRequest'

const visible = ref(false)
const formRef = ref()
const formState = reactive({
  newPassword: '',
  oldPassword: '',
  rePassword: ''
})

async function validator(rule, value) {
  if (!value) return Promise.reject('请确认新密码')
  else if (value.length < 6 || value.length > 16) return Promise.reject('密码长度在6到16位之间')
  else if (formState.newPassword !== value) return Promise.reject('两次密码不一致')
  return Promise.resolve()
}

const { execute, isFetching: loading, data } = usePost('/user/updatePassword', formState)

async function handleOk() {
  try {
    await formRef.value?.validate()
    await execute()
    if (data.value) cancel()
  } catch {}
}

function cancel() {
  formRef.value?.resetFields()
  visible.value = false
}

function open() {
  visible.value = true
}

defineExpose({
  open
})
</script>
