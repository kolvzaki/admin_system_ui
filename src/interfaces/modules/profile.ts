export interface IProfile{
  id:number,
  username: string,
  password?:string,
  nickname:string,
  age:number,
  avatar:string,
  introduce:string,
  email:string,
  mobile:string,

  isAvailable:number,
  lastLoginTime: Date,
  updateTime:Date,
  createdTime:Date

}
