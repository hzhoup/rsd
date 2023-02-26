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
    <a-form ref="formRef" :label-col="{ span: 3 }" :model="formState" :rules="formRules">
      <a-form-item label="角色名称" name="roleName">
        <a-input v-model:value="formState.roleName" placeholder="请输入角色名称" />
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
import { useRoleManage } from './useRoleManage'

const formRef = ref<FormInstance>()
const { title, visible, formState, formRules, loading, open, cancel, handleOk } =
  useRoleManage(formRef)

defineExpose({
  open
})
</script>
