<template>
  <BasicModal destroy-on-close title="角色管理" @ok="saveUser" @register="registerModal">
    <BasicForm auto-focus-first-item @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
import { saveForm } from '@/api/common/save'
import { FormSchema, useForm } from '@/components/Form'
import BasicForm from '@/components/Form/src/BasicForm.vue'
import { useModalInner } from '@/components/Modal'
import BasicModal from '@/components/Modal/src/BasicModal.vue'
import { useMessage } from '@/hooks/useMessage'

const { createMessage } = useMessage()
const emits = defineEmits(['refresh', 'register'])

const [registerModal, { setModalProps, closeModal }] = useModalInner(row => {
  setFieldsValue(row)
})

const schemas: FormSchema[] = [
  { field: 'id', label: 'id', component: 'InputNumber', show: false },
  {
    field: 'roleName',
    component: 'Input',
    label: '角色名称',
    colProps: { span: 24 },
    rules: [{ required: true, message: '请输入角色名称' }]
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    colProps: { span: 24 },
    componentProps: {
      autoSize: { minRows: 3 },
      showCount: true,
      maxlength: 200
    }
  }
]
const [registerForm, { validateFields, setFieldsValue }] = useForm({
  schemas,
  labelWidth: 80,
  rowProps: { gutter: 16 },
  showActionButtonGroup: false
})

async function saveUser() {
  try {
    const res = await validateFields()
    if (!res) return
    const { execute, data } = saveForm('role', res)
    setModalProps({ confirmLoading: true, loading: true })
    await execute()
    setModalProps({ confirmLoading: false, loading: false })
    if (!data.value) return
    closeModal()
    createMessage.success('操作成功')
    emits('refresh')
  } catch {}
}
</script>
