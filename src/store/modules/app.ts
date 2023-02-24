import { pinia } from '@/store'

let timeId

export const useAppStore = defineStore('app-store', () => {
  const state = reactive({
    reloadFlag: false,
    pageLoading: false
  })

  async function setPageLoadingAction(loading: boolean) {
    if (loading) {
      clearTimeout(timeId)
      timeId = setTimeout(() => {
        state.pageLoading = loading
      }, 50)
    } else {
      state.pageLoading = loading
      clearTimeout(timeId)
    }
  }

  async function reloadPage(duration = 0) {
    state.reloadFlag = false
    await nextTick()
    if (duration) {
      setTimeout(() => {
        state.reloadFlag = true
      }, duration)
    } else {
      state.reloadFlag = true
    }
    setTimeout(() => {
      document.documentElement.scrollTo({ left: 0, top: 0 })
    })
  }

  return { ...toRefs(state), setPageLoadingAction, reloadPage }
})

export function useAppStoreWithOut() {
  return useAppStore(pinia)
}
