import { usePost } from '@/hooks/useRequest'
import type { FormInstance } from 'ant-design-vue'
import { pick } from 'lodash-es'
import { Ref } from 'vue'

const defaultFormState = {
  id: '',
  userName: '',
  realName: '',
  gender: '',
  tel: '',
  position: '',
  email: '',
  remark: ''
}

export function useAddUser(formRef: Ref<FormInstance | undefined>, refresh) {
  const title = ref('')
  const visible = ref(false)
  const isEdit = ref(false)
  const formState = reactive({ ...defaultFormState })
  const formRules = reactive({
    userName: [{ required: true, message: '请输入用户名' }],
    realName: [{ required: true, message: '请输入真实姓名' }],
    tel: [{ required: true, message: '请输入联系电话' }],
    gender: [{ required: true, message: '请选择性别' }],
    position: [{ required: true, message: '请输入职位' }]
  })
  const { execute, data, isFetching } = usePost('/user/save', formState)

  function open(record) {
    title.value = record ? `修改员工【${record.userName}】` : `添加员工`
    if (record) {
      isEdit.value = true
      Object.assign(formState, pick(record, Object.keys(defaultFormState)))
    }
    visible.value = true
  }

  function cancel() {
    title.value = ''
    isEdit.value = false
    Object.assign(formState, defaultFormState)
    visible.value = false
  }

  async function handleOk() {
    const form = unref(formRef)
    if (!form) return
    try {
      const isValidated = await form.validate()
      if (!isValidated) return
      await execute()
      if (data.value) {
        cancel()
        refresh()
      }
    } catch {}
  }

  return {
    visible,
    title,
    formState,
    formRules,
    isEdit,
    loading: isFetching,
    open,
    cancel,
    handleOk
  }
}
