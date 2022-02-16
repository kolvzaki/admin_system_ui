import service from "@/request/request";

const api = {
  getAllPermissions: '/permission/getAll',
}

export const getAllPermissions = ()=>{
  return service.get(api.getAllPermissions)
}
