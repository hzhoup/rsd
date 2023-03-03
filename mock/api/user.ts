import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import {
  getRequestToken,
  requestParams,
  resultError,
  resultPageSuccess,
  resultSuccess
} from '../_utils'
import { userInfo, userList, userTables } from '../modules/user'

export default [
  {
    url: '/api/user/login',
    timeout: 150,
    method: 'post',
    response: ({ body }) => {
      const { userName, password } = body
      const checkUser = userList.find(
        user => user.userName === userName && user.password === password
      )
      if (!checkUser) return resultError('用户名或密码错误!')
      const { token } = checkUser
      return resultSuccess(token)
    }
  },
  {
    url: '/api/user/updatePassword',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  },
  {
    url: '/api/user/info',
    timeout: Random.integer(200, 1000),
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(userInfo)
    }
  },
  {
    url: '/api/user/getList',
    timeout: 150,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      const { pageNo = 1, pageSize = 10 } = request.query
      return resultPageSuccess(pageNo, pageSize, userTables)
    }
  },
  {
    url: '/api/user/editStatus',
    timeout: Random.integer(200, 1000),
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  },
  {
    url: '/api/user/resetPassword',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  },
  {
    url: '/api/user/save',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  },
  {
    url: '/api/user/delete',
    timeout: Random.integer(200, 1000),
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('登录过期,请重新登录', { errorCode: '401' })
      return resultSuccess(true)
    }
  }
] as MockMethod[]
