import { getStorageShortName } from '@/utils/common/env'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

export const pinia = createPinia()
pinia.use(
  createPersistedState({
    key: id => `__${getStorageShortName()}_${id}__`.toUpperCase()
  })
)

export function setupStore(app: App) {
  app.use(pinia)
}
