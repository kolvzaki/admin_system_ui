import service from "@/request/request";
import { IGround, IGroundQuery } from "@/views/System/Playground/types/types";


const api = {
  queryGround: '/ground/queryGrounds',
  createGround: '/ground/create',
  updateGround: '/ground/update',
  deleteGround: '/ground/delete',
  getGroundTypes: '/ground/types'
}

export const groundQuery = (query:IGroundQuery) =>{
  return service.get(api.queryGround,{
    params: query
  })
}

export const groundCreate = (data:IGround) => {
  return service.post(api.createGround,data)
}

export const groundUpdate = (data:IGround) =>{
  return service.put(api.updateGround+`/${data.id}`,data)
}

export const groundDelete = (data:IGround) => {
  return service.delete(api.deleteGround + `/${data.id}`)
}

export const getGroundTypes = () => {
  return service.get(api.getGroundTypes)
}
