import { RouteRecordRaw } from "vue-router";
import path from "path-browserify";
import { IFuseData } from "@/router/types";
import i18n from "@/i18n";

const getChildRoutes = (routes: RouteRecordRaw[]) => {
  const res: any = [];
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      res.push(...route.children);
    }
  });
  return res;
};

export const filterRoutes = (routes: RouteRecordRaw[]): any => {
  const childRoutes = getChildRoutes(routes);
  return routes.filter((route: any) => {
    return !childRoutes.find((childrenRoute: any) => {
      return childrenRoute.path === route.path;
    });
  });
};

export const isNull = (data: any) => {
  if (!data)
    return true;
  if (JSON.stringify(data) === "{}")
    return true;
  if (JSON.stringify(data) === "[]")
    return true;
};


export const MenuHandle = (routes: RouteRecordRaw[], basePath = ""): any => {
  let res: any = [];
  routes.forEach((item: RouteRecordRaw | any) => {
    if (isNull(item.children) && isNull(item.meta)) {
      return;
    }
    if (isNull(item.meta) && !isNull(item.children)) {
      res.push(...MenuHandle(item.children));
      return;
    }

    const routePath = path.resolve(basePath, item.path);
    let route = res.find((item: any) => item.path === routePath);
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      };
      if (route.meta.icon && route.meta.title) {
        res.push(route);
      }
    }
    if (!isNull(item.children)) {
      route.children.push(...MenuHandle(item.children, route.path));
    }
  });

  res = res.sort((a: any, b: any) => {
    return a.meta.rank - b.meta.rank;
  });

  return res;
};

export const FuseRoutes = (routes: RouteRecordRaw[], basePath = "/", prefixTitle = []) => {
  let res: IFuseData[] = [];
  for (const route of routes) {
    const data: IFuseData = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    };
    //i81n解析组合新title
    //不解析动态路由
    const regex = /.*\/:.*/;
    if (route.meta && route.meta.title && !regex.exec(route.path)) {
      let i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`);
      data.title = [...data.title, i18nTitle];
      res.push(data);
    }

    //迭代处理children
    if(route.children){
      // @ts-ignore
      const tempRoutes = FuseRoutes(route.children,data.path,data.title)
      if(tempRoutes.length > 0){
        res = [...res,...tempRoutes]
      }
    }
  }
  return res;
};


