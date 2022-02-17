import { Component } from "vue";

export interface IPage{
  page:number,
  size:number
}

export interface IDialog{
  title:string,
  isShow:boolean,
  view:Component,
  p?:object
}
