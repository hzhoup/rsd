<template>
  <a-modal
    :confirm-loading="isFetching"
    :visible="visible"
    :width="960"
    title="分配角色"
    @cancel="cancel"
    @ok="handleOk"
  >
    <RoleList ref="roleList" :user-id="params.userIds?.[0]" />
  </a-modal>
</template>

<script lang="ts" setup>
import { useMessage } from '@/hooks/useMessage'
import { usePost } from '@/hooks/useRequest'
import RoleList from '@/views/sys/RoleManage/modules/RoleList.vue'

const { createMessage } = useMessage()
const visible = ref(false)
const roleList = ref()
const params = ref<Recordable>({})
const { execute, data, isFetching } = usePost('/user/addRoleUsers', params.value)

async function handleOk() {
  params.value.pageRoleIds = unref(roleList).selectRowKeys
  params.value.roleIds = unref(roleList).roleIds
  await execute()
  if (!data.value) return
  createMessage.success('操作成功')
  cancel()
}

function open(userId) {
  params.value.userIds = [userId]
  visible.value = true
}

function cancel() {
  params.value = {}
  visible.value = false
}

defineExpose({ open })
</script>
