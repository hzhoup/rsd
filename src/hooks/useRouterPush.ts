import { PageNameEnum } from '@/enum/page'
import { router as globalRouter } from '@/router'
import type { RouteLocationRaw } from 'vue-router'

/**
 * 路由跳转
 * @param {boolean} inSetup 是否在 setup 调用，在 js 文件无法使用 useRouter & useRoute
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter

  /**
   * 路由跳转
   * @param {RouteLocationRaw} to 跳转的路由
   * @param {boolean} newTab 是否新 tab 打开
   */
  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to)
      window.open(routerData.href, '_blank')
      return Promise.resolve()
    }
    return router.push(to)
  }

  /**
   * 返回上一级路由
   */
  function routerBack() {
    router.go(-1)
  }

  function goHome() {
    routerPush({ name: PageNameEnum.HOME_NAME })
  }

  return { routerPush, routerBack, goHome }
}
