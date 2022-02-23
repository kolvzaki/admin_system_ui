export interface IGround {
  id:number|string,
  name: string,
  pics?: string,
  type: string,
  cost?: number,
  isAvailable: number,
  isDeleted: number,
  status:number|string
}

export interface IGroundQuery extends IGround{
  page:number,
  size:number,

}
