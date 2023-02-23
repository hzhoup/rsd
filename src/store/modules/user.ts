import { useGet } from '@/hooks/useRequest'
import { pinia } from '@/store'

interface UserState {
  token: Nullable<string>
  isInitAuthRoute: boolean
  permissions: string[]
  cacheRoutes: string[]
}

export const useUserStore = defineStore('app-store', () => {
  const state = reactive<UserState>({
    token: 'asdf',
    isInitAuthRoute: false,
    permissions: [],
    cacheRoutes: []
  })

  // TODO 登录后获取用户信息
  async function afterLogin(token) {
    state.token = token
    const { data, execute } = useGet('/user/info')
    await execute()
    console.log(data.value)
  }

  return { ...toRefs(state), afterLogin }
})

export function useUserStoreWithOut() {
  return useUserStore(pinia)
}
