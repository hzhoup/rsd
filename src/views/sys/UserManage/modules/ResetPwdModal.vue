<template>
  <BasicModal destroy-on-close title="重置密码" v-bind="$attrs" @ok="resetPwd" @register="register">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
import { BasicForm, FormSchema, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import { usePost } from '@/hooks/useRequest'

const emits = defineEmits(['refresh', 'register'])

const [register, { setModalProps, closeModal }] = useModalInner(({ id }) => {
  setFieldsValue({ id })
})

const schemas: FormSchema[] = [
  { field: 'id', label: 'id', component: 'InputNumber', show: false },
  {
    field: 'newPassword',
    component: 'InputPassword',
    label: '重置密码',
    colProps: { span: 24 },
    rules: [
      { required: true, message: '请输入密码' },
      { min: 6, max: 16, message: '密码长度在6到16位之间' }
    ]
  }
]
const [registerForm, { validateFields, setFieldsValue }] = useForm({
  labelWidth: 80,
  schemas,
  showActionButtonGroup: false
})

const paramRef = reactive<Recordable>({})
const { execute, data } = usePost('/user/resetPassword', paramRef)

async function resetPwd() {
  try {
    const res = await validateFields()
    if (!res) return
    setModalProps({ confirmLoading: true, loading: true })
    Object.assign(paramRef, res)
    await execute()
    setModalProps({ confirmLoading: false, loading: false })
    if (!data.value) return
    closeModal()
    emits('refresh')
  } catch {}
}
</script>
