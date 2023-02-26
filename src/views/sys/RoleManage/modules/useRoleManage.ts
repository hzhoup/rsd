import { usePost } from '@/hooks/useRequest'
import type { FormInstance } from 'ant-design-vue'
import { pick } from 'lodash-es'
import { Ref } from 'vue'

const defaultFormState = {
  id: '',
  roleName: '',
  remark: ''
}

export function useRoleManage(formRef: Ref<FormInstance | undefined>) {
  const title = ref('')
  const visible = ref(false)
  const formState = reactive({ ...defaultFormState })
  const formRules = reactive({
    roleName: [{ required: true, message: '请输入角色名称' }]
  })
  const { execute, data, isFetching } = usePost('/role/updateRole', formState)

  function open(record) {
    title.value = record ? `修改角色【${record.roleName}】` : `添加角色`
    if (record) Object.assign(formState, pick(record, Object.keys(defaultFormState)))
    visible.value = true
  }

  function cancel() {
    title.value = ''
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
      visible.value = !unref(data)
    } catch {}
  }

  return {
    visible,
    title,
    formState,
    formRules,
    loading: isFetching,
    open,
    cancel,
    handleOk
  }
}
