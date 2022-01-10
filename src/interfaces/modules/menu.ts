export  interface IMenuItem {
  path: string,
  name:string,
  redirect?:string,
  children: [],
  component?:any,
  meta?: IMeta,

}

export interface IMeta{
  icon?: string,
  title?:string,
  isKeepAlive: boolean,
  roles?: []
}
