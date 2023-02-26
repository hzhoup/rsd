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
      :label-col="{ span: 5 }"
      :model="formState"
      :rules="formRules"
      :wrapper-col="{ span: 18 }"
    >
      <a-divider orientation="left">账户信息</a-divider>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="用户名" name="userName">
            <a-input v-model:value="formState.userName" placeholder="请输入用户名" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="真实姓名" name="realName">
            <a-input v-model:value="formState.realName" placeholder="请输入真实姓名" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="联系电话" name="tel">
            <a-input v-model:value="formState.tel" placeholder="请输入联系电话" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="性别" name="gender">
            <a-radio-group v-model:value="formState.gender">
              <a-radio value="1">男</a-radio>
              <a-radio value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="工号" name="enumber">
            <a-input v-model:value="formState.enumber" placeholder="请输入工号" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">组织机构</a-divider>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="职位" name="position">
            <a-input v-model:value="formState.position" placeholder="请输入职位" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item
        :label-col="{ span: 24, offset: 1 }"
        :wrapper-col="{ span: 24, offset: 1 }"
        label="备注"
        name="remark"
      >
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
import { useAddUser } from './useAddUser'

const formRef = ref<FormInstance>()
const { title, visible, formState, formRules, loading, open, cancel, handleOk } =
  useAddUser(formRef)

defineExpose({
  open
})
</script>
