import service from "@/request/request";
import { IRole, IRoleQuery } from "@/views/System/Role/types/types";
import { IPermission } from "@/views/System/Permission/types/types";

const api = {
  getRolePermissions: '/role/getRolePermissions',
  createRole: '/role/create',
  queryRole: '/role/getRoles',
  deleteRole: '/role/delete',
  updateRole: '/role/update',
  getAllRoles: '/role/getAllRoles',
  distributePermission: '/role/distributePermission'
}

export const distributePermission = (permissions:IPermission[],rid:number) =>{
  console.log(permissions);
  return service.put(api.distributePermission+`/${rid}`,{
    permissions:permissions
  })
}

export const getAllRoles = () => {
  return service.get(api.getAllRoles)
}

export const getRolePermissionsService = (param:number)=>{
  return service.get(api.getRolePermissions,{
    params:{
      id: param
    }
  })
}

export const createRole = (data:object) =>{
  return service.post(api.createRole,data)
}

export const deleteRole = (data:IRole) =>{
  return service.delete(api.deleteRole + `/${data.id}`)
}

export const queryRole = (query:IRoleQuery) =>{
  return service.get(api.queryRole,{
    params: query
  })
}

export const updateRole = (data:IRole) =>{
  return service.post(api.updateRole +`/${data.id}`,data)
}
