export interface IPermission{
  id:string|number,
  name:string,
  remark: ''
}

export interface IPermissionQuery{
  page: number,
  size: number,
  param: object | string | number
}
