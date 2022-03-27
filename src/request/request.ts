import axios,{AxiosResponse,AxiosRequestConfig} from 'axios'
import { ElMessage as message, ElLoading as loading} from "element-plus";


import { useUserStoreOutside } from "@/store/modules/useUserStore";
import router from "@/router";
import { Local, Session } from "@/utils/storage";

let reload:{close():void};

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3*1000,
  headers:{
    'Content-Type': 'application/json;charset=utf-8',
    Accept: "application/json, text/plain, */*",
  }
});

service.interceptors.request.use(
  (config) =>{

    reload = loading.service({
      lock:true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.4)',
      spinner: 'el-icon-loading',
    })

    const userStore = useUserStoreOutside();
    const token = userStore.getToken

    if(token && config.headers){
      config.headers['token'] = token
    }

    return config
  },
  (error => {
    Promise.reject(error)
  })
);

service.interceptors.response.use(
  async(response:AxiosResponse<SysResponse>) =>{
    const res = response.data
    reload.close()
    if(res.code !== 200){
      if (res.code === 401){
        Session.clearAll()
        await router.replace('/login')
      }
      message.error(res.code + ": " + res.message)

      const error = new Error(res.message || "异常错误,请稍后重试") as Error & {code:any}
      error.code = res.code
      return Promise.reject(error)
    }else{
      return res;
    }
  },
  (error=>{

    reload.close()

    const errMsg = error?.response?.data?.message ?? "异常错误,请稍后重试";
    message.error(errMsg);
    error.message = errMsg;

    return Promise.reject(error);
  })
)

export type SysResponse<T = any> = {
  code: number;
  message: string;
  data?: T;
  executeTime?:number,
  timestamp?: any
};

export default service;

