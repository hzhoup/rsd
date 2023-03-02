import { usePost } from '@/hooks/useRequest'

export function deleteSigneById(prefix: string, id: number) {
  const { execute, data, isFetching, error } = usePost(`/${prefix}/delete`, { id })
  return { execute, data, isFetching, error }
}
