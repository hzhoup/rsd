import { Random } from 'mockjs'

export const roleList = (() => {
  const result: any[] = []
  const len = Random.integer(10, 50)

  for (let i = 0; i < len; i++) {
    result.push({
      id: `${i + 1}`,
      roleName: '@cname()',
      remark: '@cparagraph(1, 3)'
      // creatorName: '@cname()',
      // createTime: '@date("YYYY-MM-DD HH:mm:ss")'
    })
  }

  return result
})()
