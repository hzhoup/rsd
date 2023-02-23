import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from '../_utils'

const userList = [
  {
    username: 'admin',
    password: '123456',
    token: 'asdfghjklqwertyuiopzxcvbnm'
  }
]

export default [
  {
    url: '/api/user/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = userList.find(
        user => user.username === username && user.password === password
      )
      if (!checkUser) return resultError('用户名或密码错误!')
      const { token } = checkUser
      return resultSuccess({ token })
    }
  }
] as MockMethod[]
