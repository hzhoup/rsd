import { VNodeChild } from 'vue'

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

export type VueNode = VNodeChild | JSX.Element

export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

export type RefType<T> = T | null

export interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

export type TimeoutHandle = ReturnType<typeof global.setTimeout>

export type EmitType = (event: string, ...args: any[]) => void

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}
