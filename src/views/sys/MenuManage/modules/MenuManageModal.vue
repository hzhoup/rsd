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
      <a-form-item label="上级菜单" name="parentId">
        <MenuSelect v-model:value="formState.parentId" />
      </a-form-item>
      <a-form-item label="菜单名称" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入菜单名称" />
      </a-form-item>
      <a-form-item label="类型" name="type">
        <a-radio-group v-model:value="formState.type">
          <a-radio :value="0">菜单</a-radio>
          <a-radio :value="1">目录</a-radio>
          <a-radio :value="2">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单地址" name="url">
        <a-input v-model:value="formState.url" placeholder="请输入菜单地址" />
      </a-form-item>
      <a-form-item label="图标" name="icon">
        <a-input v-model:value="formState.icon" placeholder="请输入图标" />
      </a-form-item>
      <a-form-item label="权限码" name="perms">
        <a-input v-model:value="formState.perms" placeholder="请输入权限码" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="formState.status">
          <a-radio :value="0">隐藏</a-radio>
          <a-radio :value="1">显示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="显示排序" name="seq">
        <a-input-number v-model:value="formState.seq" :min="1" placeholder="请输入显示排序" />
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
import { useMenuManage } from './useMenuManage'

const emits = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const { title, visible, formState, formRules, loading, open, cancel, handleOk } = useMenuManage(
  formRef,
  () => emits('refresh')
)

defineExpose({
  open
})
</script>
