import { useMessage } from '@/hooks/useMessage'
import { usePost } from '@/hooks/useRequest'

const { createMessage } = useMessage()

export async function deleteSingle(url, params, cb) {
  const { execute, data } = usePost(url, params)
  await execute()
  if (data.value) {
    createMessage.success('操作成功')
    cb()
  }
}
