<template>
  <a-modal
    v-model:visible="visible"
    :destroy-on-close="true"
    :title="title"
    :confirm-loading="isFetching"
    @cancel="close"
    @ok="resetPwd"
  >
    <a-form ref="formRef" :model="formState">
      <a-form-item
        label="重置密码"
        name="password"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 6, max: 16, message: '密码长度在6到16位之间', trigger: 'change' }
        ]"
      >
        <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { usePost } from '@/hooks/useRequest'
import type { FormInstance } from 'ant-design-vue'

const visible = ref(false)
const title = ref('')
function open({ id, userName }) {
  visible.value = true
  formState.id = id
  formState.userName = userName
  title.value = `重置密码【${userName}】`
}
function close() {
  Object.assign(formState, {
    id: undefined,
    userName: '',
    password: ''
  })
  title.value = ''
}

const formRef = ref<FormInstance>()
const formState = reactive({
  id: undefined,
  userName: '',
  password: ''
})
const { execute, data, isFetching } = usePost('/user/resetPassword', formState)

async function resetPwd() {
  try {
    await formRef.value?.validateFields()
    await execute()
    if (data.value) visible.value = false
  } catch {}
}

defineExpose({
  open
})
</script>
