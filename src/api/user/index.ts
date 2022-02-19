import service from "@/request/request";
import { IUser, queryModel } from "@/views/System/User/types/types";

const api = {
  loginByForm: "/user/login",
  loginByMobile: "/user/loginByMobile",
  logout: "/user/logout",
  profileUpdate: '/profile/update',
  passwordUpdate: '/profile/pwdUpdate',
  getUsers: '/user/queryUsers',
  createUser: '/user/create',
  updateUser: '/user/update',
  deleteUser: '/user/delete',
  setUserAvailable: '/user/disable'
}

export function disableUser(data:IUser){
  return service.get(api.setUserAvailable+`/${data.username}`,{
    params:{
      isAvailable:data.isAvailable
    }
  })
}

export function loginByForm(data:object){
  return service.post(api.loginByForm,data)
}

export function logout(){
  return service.post(api.logout)
}

export function profileUpdate(data:object){
  return service.post(api.profileUpdate,data)
}

export function passwordUpdate(data:object){
  return service.post(api.passwordUpdate,data)
}

//TODO: create a field to get user's role.
export function getUsers(query:queryModel){
  return service.get(api.getUsers,{
    params:query
  })
}
export function CreateUser(data:object){
  return service.post(api.createUser,data)
}

export function UpdateUser(data:IUser){
  return service.post(api.updateUser + `/${data?.username}`,data)
}

export function DeleteUser(username:string,param:number){
  return service.get(api.deleteUser+`/${username}`,{
    params:{
      'isDeleted': param
    }
  })
}
