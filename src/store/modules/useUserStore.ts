import {defineStore} from "pinia";
import {Local, Session} from "@/utils/storage";

const useUserStore = defineStore({
    id: 'userStore',
    state:()=>({
      token:'',
      avatar: '',
      roles: '',
      name:'',
    }),

    actions:{
      setLoginInfo(value:any){
        Local.setItem('token',value)
        this.$state.token = value
      },
      clearInfo(){
        Session.clearAll()
      }
    },
    getters:{
      getToken(state){
        if (state.token.length === 0){
          return Local.getItem('token')
        }
        else
          return state.token
      },
      getAvatar(state){
        return state.avatar
      }

    }
})



export default useUserStore
