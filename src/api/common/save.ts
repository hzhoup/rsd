import { usePost } from '@/hooks/useRequest'
import { MaybeRef } from '@vueuse/core'

export function saveForm(prefix: string, state: MaybeRef<Recordable>) {
  const { execute, data, isFetching, error } = usePost(`/${prefix}/save`, state)
  return { execute, data, isFetching, error }
}
