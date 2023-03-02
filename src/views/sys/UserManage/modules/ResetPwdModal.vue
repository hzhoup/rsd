<template>
  <BasicModal destroy-on-close title="重置密码" v-bind="$attrs" @ok="resetPwd" @register="register">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
import { BasicForm } from '@/components/Form'
import { useForm } from '@/components/Form/src/hooks/useForm'
import { FormSchema } from '@/components/Form/src/types/form'
import { BasicModal, useModalInner } from '@/components/Modal'
import { usePost } from '@/hooks/useRequest'

const [register, { setModalProps, closeModal }] = useModalInner(({ id }) => {
  paramRef.id = id
})

const schemas: FormSchema[] = [
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
const [registerForm, { validateFields }] = useForm({
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
    if (data.value) closeModal()
  } catch {}
}
</script>
