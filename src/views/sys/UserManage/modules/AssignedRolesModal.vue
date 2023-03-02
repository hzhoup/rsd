<template>
  <a-modal
    :confirm-loading="isFetching"
    :visible="visible"
    :width="960"
    title="分配角色"
    destroy-on-close
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
import { isArray, isNumber } from 'lodash-es'

const { createMessage } = useMessage()
const emits = defineEmits(['refresh'])
const visible = ref(false)
const roleList = ref()
const params = ref<Recordable>({})
const { execute, data, isFetching } = usePost('/user/addRoleUsers', params.value)

async function handleOk() {
  params.value.pageRoleIds = unref(roleList).pageRoleIds
  params.value.roleIds = unref(roleList).selectRowKeys
  await execute()
  if (!data.value) return
  createMessage.success('操作成功')
  cancel()
  emits('refresh')
}

function open(userId) {
  if (isNumber(userId)) params.value.userIds = [userId]
  else if (isArray(userId)) params.value.userIds = userId
  visible.value = true
}

function cancel() {
  params.value = {}
  unref(roleList).resetRef()
  visible.value = false
}

defineExpose({ open })
</script>
