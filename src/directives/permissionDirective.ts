/**
 * v-auth="xxxx"
 */
import { useUserStoreWithOut } from '@/store/modules/user'
import type { App, Directive, DirectiveBinding } from 'vue'

function isAuth(el: Element, binding: any) {
  const value = binding.value
  if (!value) return

  const userStore = useUserStoreWithOut()
  if (!userStore.permissions.includes(value)) {
    el.parentNode?.removeChild(el)
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding)
}

const authDirective: Directive = {
  mounted
}

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective)
}
