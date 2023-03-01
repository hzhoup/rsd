import { mock } from 'mockjs'

export const MenuDb = mock({
  'list|10-50': [
    {
      'id|+1': 1,
      name: '@cword(4,6)',
      type: 0,
      url: `/@word(5,10)`,
      icon: '@word(5,10)',
      'seq|+1': 1,
      perms: '@word(5,10)',
      remark: '@cparagraph(1, 3)',
      'status|1': [0, 1],
      'children|1-10': [
        {
          'id|+1': '',
          name: '@cword(4,6)',
          type: 1,
          url: `/@word(5,10)/@word(5,10)`,
          icon: '@word(5,10)',
          'seq|+1': 1,
          perms: '@word(5,10)',
          remark: '@cparagraph(1, 3)',
          'status|1': [0, 1]
        }
      ]
    }
  ]
})
