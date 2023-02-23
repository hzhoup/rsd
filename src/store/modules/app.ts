import { pinia } from '@/store'

export const useAppStore = defineStore('app-store', () => {
  const [pageLoading, togglePageLoading] = useToggle()

  return { pageLoading, togglePageLoading }
})

export function useAppStoreWithOut() {
  return useAppStore(pinia)
}
