import {RouteRecordRaw} from "vue-router";
import path from 'path-browserify';

const getChildRoutes = (routes:RouteRecordRaw[]) =>{
  const res:any =[]
  routes.forEach(route=>{
    if (route.children && route.children.length > 0){
      res.push(...route.children)
    }
  })
  return res
}

export const filterRoutes = (routes:RouteRecordRaw[]):any=>{
  const childRoutes = getChildRoutes(routes)
  return routes.filter((route:any)=>{
    return !childRoutes.find((childrenRoute:any)=>{
      return childrenRoute.path === route.path
    })
  })
}

export const isNull = (data:any)=>{
  if(!data)
    return true
  if(JSON.stringify(data) === '{}')
    return true
  if (JSON.stringify(data) === '[]')
    return true
}


export const MenuHandle = (routes:RouteRecordRaw[],basePath=''):any=>{
  let res:any =[]
  routes.forEach((item:RouteRecordRaw|any)=>{
    if(isNull(item.children) && isNull(item.meta))
    {
      return
    }
    if(isNull(item.meta) && !isNull(item.children) ){
      res.push(...MenuHandle(item.children))
      return
    }

    const routePath = path.resolve(basePath,item.path)
    let route = res.find((item:any) => item.path === routePath)
    if(!route){
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if(route.meta.icon && route.meta.title){
        res.push(route)
      }
    }
    if(!isNull(item.children)){
      route.children.push(...MenuHandle(item.children,route.path))
    }
  })

  res = res.sort((a:any,b:any)=>{
    return  a.meta.rank - b.meta.rank
  })

  return res
}


