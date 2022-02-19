export interface IOrder{
  id:number,
  username: string,
  ground: number,
  status: number,
  createdTime: string
}

export interface IOrderQuery extends IOrder{
  minTime: string,
  maxTime: string
}
