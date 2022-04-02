export interface IAccount {
  id?: string
  name: string
  roleId: string
  phone: string
  email: string
  password: string
  rePassword?: string
  avatar: string
}

export interface IAccountQueryData extends IPage {
  name: string
}
