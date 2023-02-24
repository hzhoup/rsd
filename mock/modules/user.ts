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
      icon: 'sys',
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
      icon: 'user',
      url: '/sys/UserManage',
      perms: 'user',
      seq: 1,
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