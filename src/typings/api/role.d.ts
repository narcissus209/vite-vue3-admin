export interface IRole {
  id?: string
  name: string
  createTime?: string
  state: string | number
}

export interface IRoleQueryData extends IPage {
  name: string
}
