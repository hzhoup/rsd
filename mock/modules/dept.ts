import { mock } from 'mockjs'

export const DeptDb = mock({
  'list|10-50': [
    {
      'id|+1': 1,
      deptName: '@cword(4,6)',
      masterNames: '@cname()',
      remark: '@cparagraph(1, 3)',
      'children|0-10': [
        {
          'id|+1': 100,
          deptName: '@cword(4,6)',
          masterNames: '@cname()',
          remark: '@cparagraph(1, 3)',
          'children|0-10': [
            {
              'id|+1': 1000,
              deptName: '@cword(4,6)',
              masterNames: '@cname()',
              remark: '@cparagraph(1, 3)',
              children: []
            }
          ]
        }
      ]
    }
  ]
})
