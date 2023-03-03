<template>
  <BasicForm @register="registerForm" />
</template>

<script lang="ts" setup>
import { login } from '@/api/common/glob'
import { BasicForm, FormSchema, useForm } from '@/components/Form'
import { useRouterPush } from '@/hooks/useRouterPush'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const appStore = useAppStore()
const route = useRoute()
const { routerPush } = useRouterPush()

const schemas: FormSchema[] = [
  {
    field: 'userName',
    component: 'Input',
    label: '',
    colProps: { span: 24 },
    rules: [{ required: true, message: '请输入用户名' }],
    componentProps: { placeholder: '请输入用户名' }
  },
  {
    field: 'password',
    component: 'InputPassword',
    label: '',
    colProps: { span: 24 },
    rules: [
      { required: true, message: '请输入密码' },
      { min: 6, max: 16, message: '密码长度在6到16位之间' }
    ],
    componentProps: { placeholder: '请输入密码' }
  }
]
const [registerForm, { validateFields }] = useForm({
  schemas,
  size: 'large',
  showResetButton: false,
  autoSubmitOnEnter: true,
  autoFocusFirstItem: true,
  showActionButtonGroup: true,
  submitButtonOptions: {
    block: true
  },
  actionColOptions: {
    span: 24
  },
  submitFunc: loginByForm
})
async function loginByForm() {
  try {
    const res = await validateFields()
    if (!res) return
    const { execute, data } = login(res)
    appStore.setPageLoadingAction(true)
    await execute()
    if (!unref(data)) {
      appStore.pageLoading = false
      return
    }
    userStore.token = data.value
    await userStore.afterLogin()
    const { redirect } = route.query
    await routerPush({ path: (redirect as string) || '/' })
  } catch {}
}
</script>
