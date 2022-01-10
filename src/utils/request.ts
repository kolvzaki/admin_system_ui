import axios,{AxiosResponse,AxiosRequestConfig} from 'axios'

const requests = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5 * 1000
});

requests.interceptors.request.use(
  (config:AxiosRequestConfig)=>{

    return config;
  },
  (error:any)=>{
    Promise.reject(error)
  });

requests.interceptors.response.use((config:AxiosResponse)=>{


  return config
},
  (error:any)=>{
    Promise.reject(error)
  });



