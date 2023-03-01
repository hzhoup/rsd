import { PageNameEnum } from '@/enum/page'
import { useGet, usePost } from '@/hooks/useRequest'
import { router } from '@/router'
import { HomeRoute } from '@/router/routes/basic'
import { BASIC_LAYOUT, BLANK_LAYOUT } from '@/router/routes/constant'
import { pinia } from '@/store'
import { RouteRecordRaw } from 'vue-router'

interface UserState {
  token: Nullable<string>
  isInitAuthRoute: boolean
  userInfo: Recordable
  userMenus: Recordable[]
  headerMenuKeys: string[]
  sideMenuKeys: string[]
}

interface Info {
  menus: Recordable[]
  user: Recordable
}

const defaultState = {
  token: '',
  isInitAuthRoute: false,
  userInfo: {},
  userMenus: [],
  headerMenuKeys: [],
  sideMenuKeys: []
}

const modules = import.meta.glob(['@/views/**/**.vue', '!**/modules/**/**.vue'])

export const useUserStore = defineStore(
  'user-store',
  () => {
    const state = reactive<UserState>({ ...defaultState })

    const permissions = computed(() => {
      return Object.keys(state.userInfo?.permMap)
    })

    async function afterLogin() {
      const { data, execute } = useGet<Info>('/user/info')
      await execute()
      if (data.value) {
        const { user, menus } = data.value
        menus2Routes(menus)
        state.userInfo = user
        state.userMenus = menus
        state.isInitAuthRoute = true
      }
    }

    function menus2Routes(menus: Recordable[]) {
      const rootRouter = { ...HomeRoute, children: [] as Recordable[] }

      const menuMap = {}
      for (const menu of menus) {
        const menuName = menu.url.substring(menu.url.lastIndexOf('/') + 1)
        menuMap[menu.id] = {
          path: menu.url,
          name: menuName,
          meta: { title: menu.name, icon: menu.icon }
        }
        if (menuMap[menu.parentId]) {
          if (menu.type === 0) menuMap[menu.id].component = BLANK_LAYOUT
          else {
            menuMap[menu.id].component = modules[`/src/views${menu.url}/index.vue`]
            if (!rootRouter.redirect) rootRouter.redirect = menu.url
          }

          if (!menuMap[menu.parentId].redirect) {
            menuMap[menu.parentId].redirect = menu.url
            menuMap[menu.parentId].children = []
          }
          menuMap[menu.parentId].children.push(menuMap[menu.id])
        } else {
          menuMap[menu.id].component = BASIC_LAYOUT
          rootRouter.children.push(menuMap[menu.id])
        }
      }
      router.addRoute(rootRouter as RouteRecordRaw)
    }

    async function logout() {
      const { execute, data } = usePost('/user/logout')
      await execute()
      if (!unref(data)) return
      Object.assign(state, defaultState)
      router.removeRoute(PageNameEnum.HOME_NAME)
    }

    return { ...toRefs(state), permissions, afterLogin, logout }
  },
  {
    persist: {
      paths: ['token']
    }
  }
)

export function useUserStoreWithOut() {
  return useUserStore(pinia)
}
