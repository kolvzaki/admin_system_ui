export interface IOrder{
  id:number|string|undefined,
  username: string,
  ground: number|string|undefined,
  status: number,
  createdTime: string
}

export interface IOrderQuery {
  id:number|string|undefined,
  username: string,
  ground: number|string|undefined,
  status: number,
  minTime: string,
  maxTime: string
}
