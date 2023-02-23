import { useMessage } from '@/hooks/useMessage'
import { usePost } from '@/hooks/useRequest'
import { useUserStore } from '@/store/modules/user'
import { Ref } from 'vue'

const { createErrorModal } = useMessage()
const userStore = useUserStore()

interface LoginResult {
  token: string
  companyId: number
}

export function useLoginForm(formRef: Ref<any>) {
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
  const { execute, data, error, isFetching } = usePost<LoginResult>('/user/login', formData)

  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    return await form.validate()
  }

  async function handleLogin() {
    const validInfo = await validForm()
    if (!validInfo) return
    await execute()
    if (error.value) {
      createErrorModal({
        title: '错误提示',
        content: (error.value as unknown as Error).message || '网络错误，请联系管理员'
      })
    } else {
      await userStore.afterLogin(data.value?.token)
    }
  }

  return { formData, formRules, isFetching, handleLogin }
}
