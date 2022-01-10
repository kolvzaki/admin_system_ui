export interface loginForm {
  username?:string,
  password?:string,
  mobile?:string,
  code?:string
  type:number
}



export interface LoginToken {
  token: string;
  refreshToken: string;
}
