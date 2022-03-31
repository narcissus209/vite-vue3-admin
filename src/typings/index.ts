export {}

declare global {
  interface IObject<T> {
    [index: string]: T
  }
  interface ITags {
    title: string
    path: string
    isActive: boolean
  }
  interface IPage {
    page: number
    size: number
    total?: number
  }
}
