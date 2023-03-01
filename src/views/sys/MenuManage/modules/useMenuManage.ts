import { usePost } from '@/hooks/useRequest'
import type { FormInstance } from 'ant-design-vue'
import { pick } from 'lodash-es'
import { Ref } from 'vue'

const defaultFormState = {
  id: '',
  parentId: null,
  name: '',
  type: 0,
  url: '',
  icon: '',
  perms: '',
  status: 1,
  seq: 1,
  remark: ''
}

export function useMenuManage(formRef: Ref<FormInstance | undefined>, refresh) {
  const title = ref('')
  const visible = ref(false)
  const formState = reactive({ ...defaultFormState })
  const formRules = reactive({
    parentId: [{ required: true, message: '请选择上级菜单' }],
    name: [{ required: true, message: '请输入菜单名称' }],
    type: [{ required: true, message: '请选择菜单类型' }],
    url: [{ required: true, message: '请输入菜单地址' }],
    icon: [{ required: true, message: '请输入菜单图标' }],
    status: [{ required: true, message: '请选择菜单状态' }],
    seq: [{ required: true, message: '请输入菜单显示排序' }],
    perms: [{ required: true, message: '请输入菜单权限码' }]
  })
  const { execute, data, isFetching } = usePost('/menu/save', formState)

  function open(record) {
    title.value = record ? `修改菜单【${record.name}】` : `添加菜单`
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
