import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { getRequestToken, requestParams, resultError, resultSuccess } from '../_utils'
import { DeptDb } from '../modules/dept'

export default [
  {
    url: '/api/dept/getList',
    timeout: 150,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(DeptDb.list)
    }
  },
  {
    url: '/api/dept/delete',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  },
  {
    url: '/api/dept/save',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  }
] as MockMethod[]
