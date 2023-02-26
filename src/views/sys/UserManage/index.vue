<template>
  <a-card>
    <div class="mb-12">
      <a-form :model="formData" layout="inline">
        <a-form-item label="姓名" name="userName">
          <a-input
            v-model:value="formData.userName"
            class="!w-200"
            placeholder="请输入姓名"
            @keyup.enter="refresh(true)"
          />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select
            v-model:value="formData.status"
            allow-clear
            class="!w-200"
            placeholder="请选择状态"
          >
            <a-select-option value="0">启用</a-select-option>
            <a-select-option value="1">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="refresh(true)">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="mb-12">
      <a-space>
        <a-button type="primary" @click="addUser(null)">添加员工</a-button>
        <a-button :disabled="!selectedRowKeys.length" type="primary">删除</a-button>
        <a-button :disabled="!selectedRowKeys.length" type="primary">设置角色</a-button>
        <a-button :disabled="!selectedRowKeys.length" type="primary">添加部门</a-button>
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
        key="userName"
        :resizable="true"
        :sorter="true"
        :width="140"
        data-index="userName"
        fixed="left"
        title="用户名"
      />
      <a-table-column
        key="realName"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="realName"
        fixed="left"
        title="姓名"
      />
      <a-table-column
        key="enumber"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="enumber"
        fixed="left"
        title="工号"
      />
      <a-table-column
        key="deptName"
        :resizable="true"
        :sorter="true"
        :width="200"
        data-index="deptName"
        title="所属部门"
      />
      <a-table-column
        key="tel"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="tel"
        title="电话"
      />
      <a-table-column
        key="position"
        :resizable="true"
        :sorter="true"
        :width="150"
        data-index="position"
        title="职位"
      />
      <a-table-column
        key="relatedPermissions"
        :resizable="true"
        :sorter="true"
        :width="200"
        data-index="relatedPermissions"
        title="关联权限"
      />
      <a-table-column
        key="status"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="status"
        title="状态"
      >
        <template #default="{ text }">
          {{ text ? '禁用' : '启用' }}
        </template>
      </a-table-column>
      <a-table-column
        key="remark"
        :ellipsis="{ showTitle: true }"
        :resizable="true"
        :width="200"
        data-index="remark"
        title="备注"
      />
      <a-table-column :width="330" fixed="right" title="操作">
        <template #default="{ record }">
          <a-space>
            <a-button type="link" @click="addUser(record)">编辑</a-button>
            <a-button type="link" @click="resetPwd(record)">重置密码</a-button>
            <a-button type="link">分配角色</a-button>
            <a-popconfirm
              :title="`是否确认${record.status ? '启用' : '禁用'}`"
              placement="left"
              @confirm="editStatus(record, () => refresh(true))"
            >
              <a-button type="link">
                {{ record.status ? '启用' : '禁用' }}
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <ResetPwdModal ref="resetPwdModalRef" />
    <AddUserModal ref="addUserModalRef" />
  </a-card>
</template>

<script lang="ts" setup>
import { useTable } from '@/hooks/useTable'
import AddUserModal from '@/views/sys/UserManage/modules/AddUserModal.vue'
import ResetPwdModal from '@/views/sys/UserManage/modules/ResetPwdModal.vue'
import { editStatus } from './useUserManage'

defineOptions({ name: 'UserManage' })

const formData = reactive({})
const { loading, pagination, list, handleTableChange, selectedRowKeys, onSelectChange, refresh } =
  useTable({
    url: '/user/getList',
    params: formData
  })

const resetPwdModalRef = ref()
const addUserModalRef = ref()

function resetPwd(record) {
  resetPwdModalRef.value?.open(record)
}

function addUser(record) {
  addUserModalRef.value?.open(record)
}
</script>
