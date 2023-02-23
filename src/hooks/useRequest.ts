import { PageNameEnum } from '@/enum/page'
import { useRouterPush } from '@/hooks/useRouterPush'
import { useUserStoreWithOut } from '@/store/modules/user'
import { isDevMode } from '@/utils/common/env'
import { createFetch, isObject, MaybeRef, UseFetchReturn } from '@vueuse/core'
import { computed, unref } from 'vue'
import { LocationQueryRaw, stringifyQuery } from 'vue-router'
import { useMessage } from './useMessage'

const { createMessage } = useMessage()
const { routerPush } = useRouterPush(false)

const useRequest = createFetch({
  baseUrl: import.meta.env.APP_BASE_URL,
  options: {
    immediate: false,
    timeout: 10 * 1000,
    beforeFetch({ options }) {
      const userStore = useUserStoreWithOut()
      options.headers = Object.assign(options.headers || {}, {
        'Access-Token': userStore.token
      })
      return { options }
    },
    afterFetch({ data, response }) {
      const userStore = useUserStoreWithOut()
      const status = data.errorCode

      if (!status) {
        data = data.data || {}
      } else if (status === '401') {
        userStore.token = null
        createMessage.warning(data.errorMessage || '登陆已经过期')
        setTimeout(() => {
          routerPush({ name: PageNameEnum.LOGIN_NAME })
        }, 1500)
        data = null
      } else {
        createMessage.warning(data.errorMessage || '网络请求错误,请联系管理员!')
        data = null
      }

      isDevMode() && console.log('result:', data)

      return { data, response }
    },
    onFetchError({ data, error }) {
      isDevMode() && console.error(error)
      data = null
      return { data, error }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

/**
 * 封装 get 请求
 * @param url 请求地址
 * @param query 请求参数
 */
export function useGet<T = unknown>(
  url: MaybeRef<string>,
  query?: MaybeRef<unknown>
): UseFetchReturn<T> {
  const _url = computed(() => {
    const _url = unref(url)
    const _query = unref(query)
    const queryString = isObject(_query) ? stringifyQuery(_query as LocationQueryRaw) : _query || ''
    return `${_url}${queryString ? '?' : ''}${queryString}`
  })

  return useRequest<T>(_url).json()
}

/**
 * 封装 post 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePost<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).post(payload).json()
}

/**
 * 封装 put 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePut<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).put(payload).json()
}

/**
 * 封装 delete 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function useDelete<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).delete(payload).json()
}

/**
 * 封装获取Blob进行下载
 * @param url 请求地址
 */
export function useBlob(url: MaybeRef<string>): UseFetchReturn<Blob> {
  return useRequest(url).blob()
}
