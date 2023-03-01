import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { getRequestToken, requestParams, resultError, resultSuccess } from '../_utils'
import { MenuDb } from '../modules/menu'

export default [
  {
    url: '/api/menu/getList',
    timeout: 150,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(MenuDb.list)
    }
  },
  {
    url: '/api/menu/delete',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  },
  {
    url: '/api/menu/save',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  }
] as MockMethod[]
