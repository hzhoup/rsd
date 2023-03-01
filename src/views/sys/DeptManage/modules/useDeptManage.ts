import { usePost } from '@/hooks/useRequest'
import type { FormInstance } from 'ant-design-vue'
import { pick } from 'lodash-es'
import { Ref } from 'vue'

const defaultFormState = {
  id: undefined,
  deptName: undefined,
  parentId: null,
  remark: undefined
}

export function useDeptManage(formRef: Ref<FormInstance | undefined>, refresh) {
  const title = ref('')
  const visible = ref(false)
  const formState = reactive({ ...defaultFormState })
  const formRules = reactive({
    parentId: [{ required: true, message: '请选择上级部门' }],
    deptName: [{ required: true, message: '请输入部门名称' }]
  })
  const { execute, data, isFetching } = usePost('/dept/save', formState)

  function open(record) {
    title.value = record ? `修改部门【${record.deptName}】` : `添加部门`
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
