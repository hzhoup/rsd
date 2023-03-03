import { usePost } from '@/hooks/useRequest'
import { MaybeRef } from '@vueuse/core'

export const login = (state: MaybeRef<Recordable>) => usePost<string>('/user/login', state)
