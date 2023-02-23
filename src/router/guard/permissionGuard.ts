import { PageNameEnum } from '@/enum/page'
import { createDynamicRoute } from '@/router/guard/dynamic'
import { useUserStoreWithOut } from '@/store/modules/user'
import type { Router } from 'vue-router'

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()

  router.beforeEach(async (to, form, next) => {
    const flag = await createDynamicRoute(to, form, next)
    if (!flag) return

    const isLogin = Boolean(userStore.token)

    if (isLogin && to.name === PageNameEnum.LOGIN_NAME) {
      next({ name: PageNameEnum.HOME_NAME })
      return
    }

    next()
  })
}
