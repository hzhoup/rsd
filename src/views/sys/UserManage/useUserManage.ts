import { useMessage } from '@/hooks/useMessage'
import { usePost } from '@/hooks/useRequest'

const { createMessage } = useMessage()

export async function editStatus(record, cb) {
  const { execute, data } = usePost('/user/updateStatus', {
    id: record.id,
    status: record.status ? 0 : 1
  })
  await execute()
  if (data.value) {
    createMessage.success('操作成功')
    cb()
  }
}

export async function deleteUser({ id }, cb) {
  const { execute, data } = usePost('/user/delete', { id })
  await execute()
  if (data.value) {
    createMessage.success('操作成功')
    cb()
  }
}
