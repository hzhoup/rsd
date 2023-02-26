import { useGet } from '@/hooks/useRequest'

export async function editStatus(record, cb) {
  const { execute, data } = useGet('/user/editStatus', { id: record.id, status: record.status })
  await execute()
  if (data.value) cb()
}
