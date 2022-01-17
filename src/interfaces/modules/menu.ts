import { RouteMeta } from "vue-router";

export  interface IMenuItem {
  path: string,
  name:string,
  redirect?:string,
  children: [],
  component?:any,
  meta?: IMeta,

}

export interface IMeta extends RouteMeta{
  icon?: string,
  title?:string,
  isKeepAlive: boolean,
  roles?: []
}
