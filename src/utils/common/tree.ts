export function list2tree(list: Recordable[]) {
  const result: Recordable[] = []
  const map = {}

  const getHasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property)

  for (const item of list) {
    map[item.id] = {
      ...item,
      children: getHasOwnProperty(map, item.id) ? map[item.id].children : []
    }
    const newItem = map[item.id]
    if (!getHasOwnProperty(map, item.parentId)) {
      result.push(map[item.id])
    } else {
      map[item.parentId].children.push(newItem)
    }
  }

  return result
}
