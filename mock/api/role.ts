import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import {
  getRequestToken,
  requestParams,
  resultError,
  resultPageSuccess,
  resultSuccess
} from '../_utils'
import { roleList } from '../modules/role'

export default [
  {
    url: '/api/role/getList',
    timeout: 150,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      const { pageNo = 1, pageSize = 10 } = request.query
      return resultPageSuccess(pageNo, pageSize, roleList)
    }
  },
  {
    url: '/api/role/delete',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  }
] as MockMethod[]
