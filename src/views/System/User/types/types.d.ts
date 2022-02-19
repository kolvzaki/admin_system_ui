export interface IUser{
  id: string|number,
  username:string,
  nickname: string,
  gender:  number,
  mobile:string,
  email:string,
  age: number,
  role: string|number,
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
  role: string;
  page:number,
  size:number
}
