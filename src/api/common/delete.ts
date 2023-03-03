import { useMessage } from '@/hooks/useMessage'
import { usePost } from '@/hooks/useRequest'
import { isFunction } from 'lodash-es'
import { Fn } from 'types'

const { createConfirm, createMessage } = useMessage()

export function deleteSigneById(prefix: string, id: number) {
  const { execute, data, isFetching, error } = usePost(`/${prefix}/delete`, { id })
  return { execute, data, isFetching, error }
}

interface SigneParams {
  title: string
  prefix: string
  id: number
  afterDeleteFn?: Fn
}

export const deleteSigneConfirm = ({ title, prefix, id, afterDeleteFn }: SigneParams) =>
  createConfirm({
    type: 'info',
    iconType: 'info',
    title: `是否确认删除${title}`,
    onOk: async () => {
      const { execute, data } = deleteSigneById(prefix, id)
      await execute()
      if (!data.value) return
      createMessage.success('操作成功')
      if (isFunction(afterDeleteFn)) afterDeleteFn()
    }
  })
