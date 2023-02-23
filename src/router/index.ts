import { createRouterGuard } from '@/router/guard'
import { WHITE_ROUTES } from '@/router/routes/basic'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: WHITE_ROUTES,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}
