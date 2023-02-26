<template>
  <a-card>
    <div class="mb-12">
      <a-form :model="formData" layout="inline">
        <a-form-item label="角色名称" name="roleName">
          <a-input
            v-model:value="formData.roleName"
            class="!w-200"
            placeholder="角色名称"
            @keyup.enter="refresh(true)"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="refresh(true)">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="mb-12">
      <a-space>
        <a-button type="primary" @click="addOrUpdateRole(null)">添加</a-button>
        <a-button :disabled="!selectedRowKeys.length" type="primary">删除</a-button>
      </a-space>
    </div>
    <a-table
      :data-source="list"
      :loading="loading"
      :pagination="pagination"
      :row-key="record => record.id"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :scroll="{ scrollToFirstRowOnChange: true, x: '100%' }"
      size="middle"
      @change="handleTableChange"
    >
      <a-table-column
        key="roleName"
        :resizable="true"
        :sorter="true"
        :width="140"
        data-index="roleName"
        fixed="left"
        title="角色名称"
      />
      <a-table-column
        key="remark"
        :ellipsis="{ showTitle: true }"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="remark"
        title="描述"
      />
      <a-table-column
        key="creatorName"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="creatorName"
        title="创建人"
      />
      <a-table-column
        key="createTime"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="createTime"
        title="创建时间"
      />
      <a-table-column :width="220" fixed="right" title="操作">
        <template #default="{ record }">
          <a-space>
            <a-button type="link" @click="addOrUpdateRole(record)">编辑</a-button>
            <a-button type="link">配置</a-button>
            <a-button type="link">用户列表</a-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <RoleManageModal ref="roleManageModal" />
  </a-card>
</template>

<script lang="ts" setup>
import { useTable } from '@/hooks/useTable'
import RoleManageModal from '@/views/sys/RoleManage/modules/RoleManageModal.vue'

defineOptions({ name: 'RoleManage' })

const formData = reactive({})
const { loading, pagination, list, handleTableChange, selectedRowKeys, onSelectChange, refresh } =
  useTable({
    url: '/role/getAppRoleList',
    params: formData
  })

const roleManageModal = ref()

function addOrUpdateRole(record) {
  roleManageModal.value?.open(record)
}
</script>
