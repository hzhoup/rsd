import type { ComponentPublicInstance, FunctionalComponent } from 'vue'

declare global {
  declare type Nullable<T> = T | null
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }

  interface ImportMetaEnv extends ViteEnv {}

  declare interface ViteEnv {
    VITE_PUBLIC_PATH: string
    VITE_PORT: number
    VITE_PROXY: [string, string][]
    VITE_MOCK: boolean

    APP_TITLE: string
    APP_SHORT_NAME: string
    APP_BASE_URL: string
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}
