export interface User{
  username:string,
  nickname: string,
  gender:  number,
  mobile:string,
  email:string,
  minAge: number,
  maxAge:  number,
  introduce:string,
  isAvailable: number,
  isDeleted: number,
  lastLoginTime: string,
  updateTime: string,
  createdTime: string
}

export interface queryModel {
  username: string;
  mobile: string,
  email:string,
  //gender: number;
  isAvailable: number;
  isDeleted: number;
  page:number,
  size:number
}
