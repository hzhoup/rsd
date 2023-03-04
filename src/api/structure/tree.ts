import { useGet } from '@/hooks/useRequest'

export function getMenuAndAddRoot() {
  return new Promise(async resolve => {
    const { execute, data } = useGet<Recordable[]>('/menu/getList')
    await execute()
    if (data.value) {
      const result = [{ name: '根目录', id: -1, children: [] as any[], parentId: null }]
      result[0].children = data.value
      return resolve(result)
    }
    return resolve([])
  })
}
