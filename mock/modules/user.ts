import { Random } from 'mockjs'

export const userList = [
  {
    userName: 'admin',
    password: '123456',
    token: 'asdfghjklqwertyuiopzxcvbnm'
  }
]

export const userInfo = {
  menus: [
    {
      id: 1,
      parentId: -1,
      name: '系统管理',
      icon: 'setting',
      url: '/sys',
      perms: 'sys',
      seq: 1,
      level: 0,
      type: 0,
      menuType: 0
    },
    {
      id: 2,
      parentId: 1,
      name: '用户管理',
      icon: 'people',
      url: '/sys/UserManage',
      perms: 'user',
      seq: 1,
      level: 1,
      type: 1,
      menuType: 0
    },
    {
      id: 3,
      parentId: 1,
      name: '角色管理',
      icon: 'permissions',
      url: '/sys/RoleManage',
      perms: 'role',
      seq: 2,
      level: 1,
      type: 1,
      menuType: 0
    },
    {
      id: 4,
      parentId: 1,
      name: '菜单管理',
      icon: 'applicationMenu',
      url: '/sys/MenuManage',
      perms: 'role',
      seq: 3,
      level: 1,
      type: 1,
      menuType: 0
    },
    {
      id: 5,
      parentId: 1,
      name: '组织管理',
      icon: 'level',
      url: '/sys/DeptManage',
      perms: 'role',
      seq: 3,
      level: 1,
      type: 1,
      menuType: 0
    }
  ],
  user: {
    id: 614,
    userName: '13059140920',
    realName: '黄洲平',
    enumber: 'YS0006',
    avatar: '',
    status: 0,
    reSetPassword: true,
    permDataMap: {
      'sys:user:search': {
        menuId: 17,
        perms: 'sys:user:search',
        url: '/sys/UserManage',
        dataType: 2,
        parentId: 2,
        deptFullPaths: ['1/138954298/580973429/'],
        platform: 0
      }
    },
    roleIds: null,
    deptIds: [580973429],
    deptFullPaths: ['1/138954298/580973429/'],
    deptFullNames: ['信息中心/IT部'],
    mtypes: null,
    platform: 0,
    dingUserId: '16517328964972012',
    position: null
  }
}

export const userTables = (() => {
  const result: any[] = []
  const len = Random.integer(10, 50)

  for (let i = 0; i < len; i++) {
    result.push({
      id: `${i + 1}`,
      userName: '@first()',
      realName: '@cname()',
      password: '@integer(11, 11)',
      'gender|1': [0, 1, 2],
      tel: '@string("number", 11)',
      position: '@ctitle(2)',
      'status|1': [0, 1],
      avatar: '@image()',
      email: '@email()',
      remark: '@cparagraph(1, 3)'
    })
  }

  return result
})()
