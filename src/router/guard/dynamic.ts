import { PageNameEnum } from '@/enum/page'
import { WHITE_ROUTES_NAME } from '@/router/routes/basic'
import { useUserStoreWithOut } from '@/store/modules/user'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export async function createDynamicRoute(
  to: RouteLocationNormalized,
  _form: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStoreWithOut()
  const isLogin = Boolean(userStore.token)

  if (!userStore.isInitAuthRoute) {
    if (!isLogin) {
      const toName = to.name as string
      if (WHITE_ROUTES_NAME.includes(toName) && toName !== PageNameEnum.PAGE_NOT_FOUND_NAME) next()
      else {
        const redirect = to.fullPath
        next({ name: PageNameEnum.LOGIN_NAME, query: { redirect } })
      }
      return false
    }

    await userStore.afterLogin()

    if (to.name === PageNameEnum.PAGE_NOT_FOUND_NAME) {
      const path = to.redirectedFrom?.name === PageNameEnum.HOME_NAME ? '/' : to.fullPath
      next({ path, replace: true, query: to.query, hash: to.hash })
      return false
    }
  }

  if (to.name === PageNameEnum.PAGE_NOT_FOUND_NAME) {
    next({ name: PageNameEnum.PAGE_NOT_FOUND_NAME, replace: true })
    return false
  }

  return true
}
