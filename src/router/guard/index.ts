import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { Modal, notification } from 'ant-design-vue'
import NProgress from 'nprogress'
import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'

export function createRouterGuard(router: Router) {
  createPageLoadingGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createHtmlTitleGuard(router)
  createPermissionGuard(router)
}

// 页面加载 loading
function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()

  router.beforeEach(() => {
    if (!userStore.token) return true
    appStore.setPageLoadingAction(true)
    return true
  })
  router.afterEach(() => {
    if (!userStore.token) return true
    setTimeout(() => {
      appStore.pageLoading = false
    }, 320)
    return true
  })
}

// 关闭所有 modal & notification
function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll()
      notification.destroy()
    } catch {}
    return true
  })
}

// 顶部进度条
function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start()
    return true
  })

  router.afterEach(() => {
    NProgress.done()
    return true
  })
}

// 路由跳转改变 html title
function createHtmlTitleGuard(router: Router) {
  router.beforeEach(() => {
    useTitle('加载中...')
  })

  router.afterEach(to => {
    const tTitle = to.meta?.title
    useTitle(tTitle ? `${tTitle}-${import.meta.env.APP_TITLE}` : `${import.meta.env.APP_TITLE}`)
  })
}
