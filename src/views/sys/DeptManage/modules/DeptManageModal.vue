<template>
  <a-modal
    v-model:visible="visible"
    :confirm-loading="loading"
    :destroy-on-close="true"
    :title="title"
    :width="800"
    @cancel="cancel"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :label-col="{ span: 4 }"
      :model="formState"
      :rules="formRules"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="上级部门" name="parentId">
        <DeptSelect v-model:value="formState.parentId" />
      </a-form-item>
      <a-form-item label="部门名称" name="deptName">
        <a-input v-model:value="formState.deptName" placeholder="请输入部门名称" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea
          v-model:value="formState.remark"
          :auto-size="{ minRows: 5 }"
          placeholder="请输入备注"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { FormInstance } from 'ant-design-vue'
import { useDeptManage } from './useDeptManage'

const emits = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const { title, visible, formState, formRules, loading, open, cancel, handleOk } = useDeptManage(
  formRef,
  () => emits('refresh')
)

defineExpose({
  open
})
</script>
