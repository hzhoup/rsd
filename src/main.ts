import AppLoad from '@/AppLoad.vue'
import { setupAssets } from '@/assets'
import { setupVxeTable } from '@/components/Table'
import { setupGlobDirectives } from '@/directives'
import { router, setupRouter } from '@/router'
import { createRouterGuard } from '@/router/guard'
import { setupStore } from '@/store'
import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'

function boostrap() {
  setupAssets()

  const loadApp = createApp(AppLoad)

  loadApp.mount('#app-load')

  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  createRouterGuard(router)

  setupGlobDirectives(app)

  setupVxeTable(app)

  app.mount('#app')
}

boostrap()
