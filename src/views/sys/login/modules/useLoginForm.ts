import { usePost } from '@/hooks/useRequest'
import { useRouterPush } from '@/hooks/useRouterPush'
import { useUserStore } from '@/store/modules/user'
import type { FormInstance } from 'ant-design-vue'
import { Ref } from 'vue'

const userStore = useUserStore()
const { route, routerPush } = useRouterPush(false)

export function useLoginForm(formRef: Ref<FormInstance>) {
  const formData = reactive({
    userName: '',
    password: ''
  })
  const formRules = reactive({
    userName: [{ required: true, message: '请输入用户名' }],
    password: [
      { required: true, message: '请输入密码' },
      { min: 6, max: 16, message: '密码长度在6到16位之间', trigger: 'change' }
    ]
  })
  const { execute, data, isFetching } = usePost<string>('/user/login', formData)

  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    return await form.validate()
  }

  async function handleLogin() {
    const validInfo = await validForm()
    if (!validInfo) return
    await execute()
    if (data.value) {
      userStore.token = data.value
      await userStore.afterLogin()
      const { redirect } = route.value.query
      await routerPush({ path: (redirect as string) || '/' })
    }
  }

  return { formData, formRules, isFetching, handleLogin }
}
