import AppLoad from '@/AppLoad.vue'
import { setupAssets } from '@/assets'
import { setupVxeTable } from '@/components/VxeTable'
import { setupGlobDirectives } from '@/directives'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'

async function boostrap() {
  setupAssets()

  const loadApp = createApp(AppLoad)

  loadApp.mount('#app-load')

  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  setupGlobDirectives(app)

  setupVxeTable(app)

  app.mount('#app')
}

await boostrap()
