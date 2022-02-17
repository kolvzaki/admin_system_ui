export interface IRole{
  id:number,
  name:string,
  remark:string
}

export interface IRoleQuery {
  page:number,
  size:number,
  param:object | number|string
}
