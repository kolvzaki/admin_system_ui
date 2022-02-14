import service from "@/request/request";
import { queryModel } from "@/views/System/User/types/types";

const api = {
  loginByForm: "/user/login",
  loginByMobile: "/user/loginByMobile",
  logout: "/user/logout",
  profileUpdate: '/profile/update',
  passwordUpdate: '/profile/pwdUpdate',
  getUsers: '/user/queryUsers'
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

export function getUsers(query:queryModel){
  return service.get(api.getUsers,{
    params:query
  })
}

