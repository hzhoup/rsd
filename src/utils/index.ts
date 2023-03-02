import { isObject } from 'lodash-es'

export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  // @ts-ignore
  Object.keys(props).map(key => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}
