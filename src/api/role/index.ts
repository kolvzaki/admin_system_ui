import service from "@/request/request";
import { IRole, IRoleQuery } from "@/views/System/Role/types/types";

const api = {
  getRolePermissions: '/role/getRolePermissions',
  createRole: '/role/create',
  queryRole: '/role/getRoles',
  deleteRole: '/role/delete',
  updateRole: '/role/update'
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
    params:query
  })
}

export const updateRole = (data:IRole) =>{
  return service.post(api.updateRole +`/${data.id}`,data)
}
