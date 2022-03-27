export interface IOrder{
  id:number|string|undefined,
  uid: number,
  username: string,
  nickname: string,
  credit: number,
  mobile: string,
  email: string,
  gid: number,
  name: string,
  type: string
  cost: number,
  orderDate: any,
  orderTime : string,
  score: number,
  content: string,
  status: number,
  createdTime: any
}

export interface IOrderQuery {
  page:number,
  size:number,
  id:number|string|undefined,
  username: string,
  gid: number|string,
  name: string,
  type: string,
  status: number,
  score: number|string,
  orderDate: any,
  orderTime: string,
}
