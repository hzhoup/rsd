import { isObject } from 'lodash-es'
import { App } from 'vue'

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

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}
export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim
export type CustomComponent = Component & { displayName?: string }

export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName
    if (!compName) return
    app.component(compName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as WithInstall<T>
}
