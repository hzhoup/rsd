<template>
  <a-card>
    <FetchTable url="/user/getList"></FetchTable>
    <a-table
      :data-source="list"
      :loading="loading"
      :pagination="pagination"
      :show-sorter-tooltip="false"
      sticky
      @change="handleTableChange"
    >
      <a-table-column
        key="userName"
        :sorter="true"
        data-index="userName"
        fixed="left"
        resizable
        title="用户名"
        width="100"
      />
      <a-table-column
        key="realName"
        :sorter="true"
        data-index="realName"
        fixed="left"
        resizable
        title="姓名"
        width="100"
      />
      <a-table-column
        key="enumber"
        :sorter="true"
        data-index="enumber"
        fixed="left"
        resizable
        title="工号"
        width="90"
      />
      <a-table-column
        key="deptName"
        :sorter="true"
        data-index="deptName"
        resizable
        title="所属部门"
        width="180"
      />
      <a-table-column
        key="tel"
        :sorter="true"
        data-index="tel"
        resizable
        title="电话"
        width="120"
      />
      <a-table-column
        key="position"
        :sorter="true"
        data-index="position"
        resizable
        title="职位"
        width="150"
      />
      <a-table-column
        key="relatedPermissions"
        :sorter="true"
        data-index="relatedPermissions"
        resizable
        title="关联权限"
        width="200"
      />
      <a-table-column
        key="status"
        :sorter="true"
        data-index="status"
        resizable
        title="状态"
        width="80"
      >
        <template #default="{ text }">
          {{ text ? '禁用' : '启用' }}
        </template>
      </a-table-column>
      <a-table-column key="remark" data-index="remark" resizable title="备注" width="200" />
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
import { useTable } from '@/hooks/useTable'

defineOptions({ name: 'UserManage' })
const { loading, pagination, list, handleTableChange } = useTable({ url: '/user/getList' })
</script>
