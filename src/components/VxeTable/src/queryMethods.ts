import { useGet } from '@/hooks/useRequest'

export function pageQuery({ page, sort, form }, url) {
  return new Promise(async resolve => {
    const params = Object.assign({}, form)
    params.pageNo = page.currentPage
    params.pageSize = page.pageSize
    if (sort.field) {
      params.field = sort.field
      params.order = sort.order
    }
    const { execute, data } = useGet(url, params)
    await execute()
    resolve(unref(data))
  })
}
