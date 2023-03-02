<template>
  <BasicModal
    destroy-on-close
    title="修改密码"
    v-bind="$attrs"
    @ok="updatePassword"
    @register="registerModal"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
import { FormSchema, useForm } from '@/components/Form'
import BasicForm from '@/components/Form/src/BasicForm.vue'
import { useModalInner } from '@/components/Modal'
import BasicModal from '@/components/Modal/src/BasicModal.vue'
import { usePost } from '@/hooks/useRequest'

const [registerModal, { setModalProps, closeModal }] = useModalInner()

const schemas: FormSchema[] = [
  {
    field: 'oldPassword',
    component: 'InputPassword',
    label: '原密码',
    colProps: { span: 24 },
    rules: [
      { required: true, message: '请输入原密码' },
      { min: 6, max: 16, message: '原密码长度在6到16位之间' }
    ]
  },
  {
    field: 'newPassword',
    component: 'InputPassword',
    label: '新密码',
    colProps: { span: 24 },
    rules: [
      { required: true, message: '请输入新密码' },
      { min: 6, max: 16, message: '新密码长度在6到16位之间' }
    ]
  },
  {
    field: 'rePassword',
    component: 'InputPassword',
    label: '确认密码',
    colProps: { span: 24 },
    rules: [
      {
        required: true,
        validator(rule, value) {
          if (!value) return Promise.reject('请确认新密码')
          if (value.length < 6 || value.length > 16) return Promise.reject('密码长度在6到16位之间')
          const state = getFieldsValue()
          if (state.newPassword !== value) return Promise.reject('两次密码不一致')
          return Promise.resolve()
        }
      }
    ]
  }
]
const [registerForm, { validateFields, getFieldsValue }] = useForm({
  labelWidth: 80,
  schemas,
  showActionButtonGroup: false
})

async function updatePassword() {
  try {
    const res = await validateFields()
    if (!res) return
    setModalProps({ confirmLoading: true, loading: true })
    const { execute, data } = usePost('/user/updatePassword', res)
    await execute()
    setModalProps({ confirmLoading: false, loading: false })
    if (data.value) closeModal()
  } catch {}
}
</script>
