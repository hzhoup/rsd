<template>
  <a-card>
    <div class="mb-12">
      <a-form :model="formData" layout="inline">
        <a-form-item label="部门名称" name="menuName">
          <a-input
            v-model:value="formData.deptName"
            class="!w-200"
            placeholder="部门名称"
            @keyup.enter="refresh(true)"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="refresh(true)">查询</a-button>
            <a-button type="primary" @click="saveDept(null)">添加</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <a-table
      :data-source="list"
      :loading="loading"
      :pagination="false"
      :row-key="record => record.id"
      :scroll="{ scrollToFirstRowOnChange: true, x: '100%' }"
      default-expand-all-rows
      size="middle"
      @change="handleTableChange"
    >
      <a-table-column
        key="deptName"
        :resizable="true"
        :sorter="true"
        :width="140"
        data-index="deptName"
        fixed="left"
        title="部门名称"
      />
      <a-table-column
        key="masterNames"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="masterNames"
        title="负责人"
      />
      <a-table-column
        key="remark"
        :ellipsis="{ showTitle: true }"
        :resizable="true"
        :sorter="true"
        :width="180"
        data-index="remark"
        title="备注"
      />
      <a-table-column :width="120" fixed="right" title="操作">
        <template #default="{ record }">
          <a-space>
            <a-button type="link" @click="saveDept(record)">编辑</a-button>
            <a-button type="link">用户列表</a-button>
            <a-popconfirm
              :title="`是否确认删除`"
              placement="left"
              @confirm="deleteSingle('/dept/delete', { id: record.id }, () => refresh(true))"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <DeptManageModal ref="deptManageModal" @refresh="refresh(true)" />
  </a-card>
</template>

<script lang="ts" setup>
import { deleteSingle } from '@/hooks/useFixHttp'
import { useTable } from '@/hooks/useTable'
import DeptManageModal from './modules/DeptManageModal.vue'

defineOptions({ name: 'MenuManage' })

const formData = reactive({})
const { loading, list, handleTableChange, refresh } = useTable({
  url: '/dept/getList',
  params: formData,
  hasPag: false
})

const deptManageModal = ref()

function saveDept(record) {
  deptManageModal.value?.open(record)
}
</script>
