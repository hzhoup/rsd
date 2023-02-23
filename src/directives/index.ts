import { setupLoadingDirective } from '@/directives/loadingDirective'
import { setupPermissionDirective } from '@/directives/permissionDirective'
import type { App } from 'vue'

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app)
  setupLoadingDirective(app)
}
