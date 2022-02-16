import service from "@/request/request";

const api = {
  getRolePermissions: '/role/getRolePermissions',
  createRole: '/role/create'
}

export const getRolePermissions = (data:object)=>{
  return service.get(api.getRolePermissions,data)
}

export const createRole = (data:object) =>{
  return service.post(api.createRole,data)
}
