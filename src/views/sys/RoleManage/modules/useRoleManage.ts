import { useGet, usePost } from '@/hooks/useRequest'
import type { FormInstance } from 'ant-design-vue'
import { pick } from 'lodash-es'
import { Ref } from 'vue'
import XEUtils from 'xe-utils'

const defaultFormState = {
  id: '',
  roleName: '',
  remark: ''
}

export function useRoleManage(formRef: Ref<FormInstance | undefined>, refresh) {
  const title = ref('')
  const visible = ref(false)
  const formState = reactive({ ...defaultFormState })
  const formRules = reactive({
    roleName: [{ required: true, message: '请输入角色名称' }]
  })
  const { execute, data, isFetching } = usePost('/role/save', formState)

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
    loading: isFetching,
    open,
    cancel,
    handleOk
  }
}

export const getMenuAction = async () => {
  const { execute, data } = useGet('/role/getMenuAction')
  await execute()
  if (!unref(data)) return []
  return XEUtils.toArrayTree(unref(data))
}

export const setRole = async params => {
  const { execute, data } = usePost('/role/setRole', params)
  await execute()
  return unref(data.value)
}

export const getRoleMenuIds = async id => {
  const { execute, data } = useGet('/role/getRoleMenuIds', { roleId: unref(id) })
  await execute()
  return unref(data)
}
