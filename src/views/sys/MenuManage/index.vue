<template>
  <a-card>
    <div class="mb-12">
      <a-form :model="formData" layout="inline">
        <a-form-item label="菜单名称" name="menuName">
          <a-input
            v-model:value="formData.menuName"
            class="!w-200"
            placeholder="菜单名称"
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
            <a-select-option value="0">隐藏</a-select-option>
            <a-select-option value="1">显示</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="refresh(true)">查询</a-button>
            <a-button type="primary" @click="saveMenu(null)">添加</a-button>
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
      size="middle"
      @change="handleTableChange"
    >
      <a-table-column
        key="name"
        :resizable="true"
        :sorter="true"
        :width="140"
        data-index="name"
        fixed="left"
        title="菜单名称"
      />
      <a-table-column
        key="seq"
        :resizable="true"
        :sorter="true"
        :width="100"
        data-index="seq"
        title="排序"
      />
      <a-table-column
        key="type"
        :resizable="true"
        :sorter="true"
        :width="100"
        data-index="type"
        title="类型"
      >
        <template #default="{ text }">
          {{ text === 0 ? '菜单' : text === 1 ? '目录' : '按钮' }}
        </template>
      </a-table-column>
      <a-table-column
        key="url"
        :resizable="true"
        :sorter="true"
        :width="120"
        data-index="url"
        title="请求地址"
      />
      <a-table-column
        key="icon"
        :resizable="true"
        :sorter="true"
        :width="100"
        data-index="icon"
        title="图标"
      />
      <a-table-column
        key="status"
        :resizable="true"
        :sorter="true"
        :width="100"
        data-index="status"
        title="状态"
      >
        <template #default="{ text }">
          {{ text ? '可见' : '隐藏' }}
        </template>
      </a-table-column>

      <a-table-column
        key="remark"
        :ellipsis="{ showTitle: true }"
        :resizable="true"
        :sorter="true"
        :width="160"
        data-index="remark"
        title="备注"
      />
      <a-table-column :width="120" fixed="right" title="操作">
        <template #default="{ record }">
          <a-space>
            <a-button type="link" @click="saveMenu(record)">编辑</a-button>
            <a-popconfirm
              :title="`是否确认删除`"
              placement="left"
              @confirm="deleteSingle('/menu/delete', { id: record.id }, () => refresh(true))"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <MenuManageModal ref="menuManageModal" @refresh="refresh(true)" />
  </a-card>
</template>

<script lang="ts" setup>
import { deleteSingle } from '@/hooks/useFixHttp'
import { useTable } from '@/hooks/useTable'
import MenuManageModal from './modules/MenuManageModal.vue'

defineOptions({ name: 'MenuManage' })

const formData = reactive({})
const { loading, list, handleTableChange, refresh } = useTable({
  url: '/menu/getList',
  params: formData,
  hasPag: false
})

const menuManageModal = ref()

function saveMenu(record) {
  menuManageModal.value?.open(record)
}
</script>
