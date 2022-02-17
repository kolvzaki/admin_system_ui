import service from "@/request/request";
import { IPermission,IPermissionQuery } from "@/views/System/Permission/types/types";

const api = {
  queryPermissions: '/permission/getPermissions',
  getAllPermissions: '/permission/getAll',
  createPermission: '/permission/create',
  updatePermission: '/permission/update',
  deletePermission: '/permission/delete'
}

export const getAll = () =>{
  return service.get(api.getAllPermissions)
}

export const queryPermission = (query:IPermissionQuery) =>{
  return service.get(api.queryPermissions,{
    params: query
  })
}

export const createPermission = (data:IPermission) =>{
  return service.post(api.createPermission,data)
}

export const updatePermission = (data:IPermission) =>{
  return service.put(api.updatePermission,data)
}

export const deletePermission = (data:IPermission) =>{
  return service.delete(api.deletePermission+`/${data.id}`)
}
