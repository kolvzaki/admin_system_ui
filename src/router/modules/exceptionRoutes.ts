import {RouteRecordRaw} from "vue-router";
import layout from '@/layout/Index.vue'


const exceptRoutes:RouteRecordRaw[] =[
  {
    path:'/exception',
    redirect:'/exception/404',
    component: ()=>import("@/views/Exception/Index.vue"),
    meta:{
      icon: 'failed',
      title:'exception',
      rank:5,
    },
    children:[
      {
        path: '/exception/403',
        name:'forbidden',
        component:()=> import("@/views/Exception/403/Index.vue"),
        meta:{
          icon: 'ps:forbidden',
          title: '403',
        }
      },
      {
        path: '/exception/404',
        name:'notfound',
        component:()=> import("@/views/Exception/404/Index.vue"),
        meta:{
          icon: 'iconoir:file-not-found',
          title: '404',
        }
      },
      {
        path: '/exception/500',
        name:'serverError',
        component:()=> import("@/views/Exception/500/Index.vue"),
        meta:{
          icon: 'ant-design:warning-outlined',
          title: '500',
        }
      },
    ]
  }
]

export default exceptRoutes
