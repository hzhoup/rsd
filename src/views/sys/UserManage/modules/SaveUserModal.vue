<template>
  <BasicModal
    destroy-on-close
    title="用户管理"
    width="800px"
    @ok="saveUser"
    @register="registerModal"
  >
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
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '账户信息',
    colProps: { span: 24 }
  },
  {
    field: 'userName',
    component: 'Input',
    label: '用户名',
    colProps: { span: 12 },
    rules: [{ required: true, message: '请输入用户名' }]
  },
  {
    field: 'realName',
    component: 'Input',
    label: '真实姓名',
    colProps: { span: 12 },
    rules: [{ required: true, message: '请输入真实姓名' }]
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 12 }
  },
  {
    field: 'tel',
    component: 'Input',
    label: '联系电话',
    colProps: { span: 12 },
    rules: [{ required: true, message: '请输入联系电话' }]
  },
  {
    field: 'gender',
    component: 'RadioGroup',
    label: '性别',
    colProps: { span: 12 },
    rules: [{ required: true, message: '请选择性别' }],
    componentProps: {
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ]
    }
  },
  {
    field: 'password',
    component: 'InputPassword',
    label: '初始密码',
    colProps: { span: 12 },
    rules: [{ required: true, message: '请输入初始密码' }]
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '组织机构',
    colProps: { span: 24 }
  },
  {
    field: 'position',
    component: 'Input',
    label: '职位',
    colProps: { span: 12 },
    rules: [{ required: true, message: '请输入职位' }]
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
    const { execute, data } = saveForm('user', res)
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
