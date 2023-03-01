import { PageNameEnum } from '@/enum/page'
import { useRouterPush } from '@/hooks/useRouterPush'
import { useUserStoreWithOut } from '@/store/modules/user'
import { isDevMode } from '@/utils/common/env'
import { createFetch, isObject, MaybeRef, UseFetchReturn } from '@vueuse/core'
import { isNil, pickBy } from 'lodash-es'
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
      if (userStore.token) {
        options.headers = Object.assign(options.headers || {}, {
          'Access-Token': userStore.token
        })
      }
      return { options }
    },
    async afterFetch({ data, response }) {
      const status = data.errorCode
      if (!status) {
        data = data.data
      } else if (status === '401' || response.status === 401) {
        handleError(response, data)
      } else {
        createMessage.error(data.errorMessage || '网络请求错误,请联系管理员!')
        data = null
      }
      isDevMode() && console.log('result:', data)
      return { data, response }
    },
    onFetchError({ data, error, response }) {
      isDevMode() && console.error(error)
      handleError(response, data)
      return { data, error }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

function handleError(response, data) {
  if (response) {
    const status = response.status
    if (status === 401) {
      const userStore = useUserStoreWithOut()
      createMessage.error('登陆已过期,请重新登录')
      userStore.logout()
      setTimeout(() => {
        routerPush({ name: PageNameEnum.LOGIN_NAME })
      }, 150)
    } else if (status === 403) {
      createMessage.error(data.errorMessage)
    } else if (status === 500) {
      createMessage.error('系统异常')
      routerPush({ name: PageNameEnum.LOGIN_NAME })
    }
  }
}

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
    const queryString = isObject(_query)
      ? stringifyQuery(pickBy(_query, value => !isNil(value) && value !== '') as LocationQueryRaw)
      : _query || ''
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
  const params = computed(() => {
    return pickBy(payload as Recordable, value => !isNil(value) && value !== '')
  })
  return useRequest<T>(url).post(params).json()
}

/**
 * 封装获取Blob进行下载
 * @param url 请求地址
 */
export function useBlob(url: MaybeRef<string>): UseFetchReturn<Blob> {
  return useRequest(url).blob()
}
