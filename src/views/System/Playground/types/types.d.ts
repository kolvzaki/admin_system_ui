export interface IGround {
  id:number|string,
  name: string,
  type: string,
  isAvailable: number,
  isDeleted: number,
}

export interface IGroundQuery extends IGround{
  page:number,
  size:number


}
