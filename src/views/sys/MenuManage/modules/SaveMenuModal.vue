<template>
  <BasicModal destroy-on-close title="菜单管理" @ok="saveMenu" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
import { saveForm } from '@/api/common/save'
import { getMenuAndAddRoot } from '@/api/structure/tree'
import { FormSchema, useForm } from '@/components/Form'
import BasicForm from '@/components/Form/src/BasicForm.vue'
import { useModalInner } from '@/components/Modal'
import BasicModal from '@/components/Modal/src/BasicModal.vue'
import { useMessage } from '@/hooks/useMessage'

const { createMessage } = useMessage()
const emits = defineEmits(['refresh', 'register'])

const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(row => {
  setFieldsValue(row)
  changeLoading(false)
})

const schemas: FormSchema[] = [
  { field: 'id', label: 'id', component: 'InputNumber', show: false },
  {
    field: 'parentId',
    component: 'ApiTreeSelect',
    label: '上级菜单',
    colProps: { span: 24 },
    itemProps: { validateTrigger: 'blur' },
    componentProps: {
      api: getMenuAndAddRoot,
      resultField: 'id',
      fieldNames: { label: 'name', value: 'id' }
    },
    rules: [{ required: true, type: 'number', message: '请选择上级菜单' }]
  },
  {
    field: 'name',
    component: 'Input',
    label: '菜单名称',
    colProps: { span: 24 },
    rules: [{ required: true, message: '请输入菜单名称' }]
  },
  {
    field: 'type',
    component: 'RadioGroup',
    label: '类型',
    colProps: { span: 24 },
    rules: [{ required: true, type: 'number', message: '请选择类型' }],
    componentProps: {
      options: [
        { value: 0, label: '菜单' },
        { value: 1, label: '目录' },
        { value: 2, label: '按钮' }
      ]
    }
  },
  {
    field: 'url',
    component: 'Input',
    label: '菜单地址',
    colProps: { span: 24 },
    rules: [{ required: true, message: '请输入菜单地址' }]
  },
  {
    field: 'icon',
    component: 'Input',
    label: '图标',
    colProps: { span: 24 },
    rules: [{ required: true, message: '请输入图标' }]
  },
  {
    field: 'perms',
    component: 'Input',
    label: '权限码',
    colProps: { span: 24 },
    rules: [{ required: true, message: '请输入权限码' }]
  },
  {
    field: 'status',
    component: 'RadioGroup',
    label: '状态',
    colProps: { span: 24 },
    rules: [{ required: true, type: 'number', message: '请选择状态' }],
    componentProps: {
      options: [
        { value: 0, label: '隐藏' },
        { value: 1, label: '显示' }
      ]
    }
  },
  {
    field: 'seq',
    component: 'InputNumber',
    label: '显示排序',
    colProps: { span: 24 },
    rules: [{ required: true, message: '请输入显示排序' }],
    componentProps: {
      min: 0,
      precision: 0
    }
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
  autoSubmitOnEnter: true,
  autoFocusFirstItem: true,
  showActionButtonGroup: false,
  submitFunc: saveMenu
})

async function saveMenu() {
  try {
    const res = await validateFields()
    if (!res) return
    const { execute, data } = saveForm('menu', res)
    setModalProps({ confirmLoading: true, loading: true })
    await execute()
    setModalProps({ confirmLoading: false, loading: false })
    if (!unref(data)) return
    closeModal()
    createMessage.success('操作成功')
    emits('refresh')
  } catch {}
}
</script>
