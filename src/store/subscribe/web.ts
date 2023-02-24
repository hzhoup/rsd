import { useUserStore } from '@/store/modules/user'

export default function subscribeWeb() {
  const route = useRoute()
  const scope = effectScope()
  const userStore = useUserStore()

  scope.run(() => {
    watch(
      () => route.matched,
      newValue => {
        let headerMenuKeys: string[]
        if (newValue.length >= 3) {
          headerMenuKeys = [newValue[1].path]
        } else {
          headerMenuKeys = [newValue[newValue.length - 1].path]
        }
        userStore.headerMenuKeys = headerMenuKeys
        userStore.sideMenuKeys = [newValue[newValue.length - 1].path]
      },
      { immediate: true }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
