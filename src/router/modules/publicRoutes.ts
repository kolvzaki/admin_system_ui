import {RouteRecordRaw} from "vue-router";
import layout from "@/layout/Index.vue"

const publicRoutes:RouteRecordRaw[]=[
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },

  {
    path: '/',
    redirect: '/dashboard',
    component: layout,
    children:[
      {
        path: '/dashboard',
        name:'dashboard',
        component:()=> import("@/views/Dashboard/Index.vue"),
        meta:{
          icon: 'odometer',
          title: 'dashboard',
          rank:1
        }
      },
      {
        path: '/profile',
        name:'profile',
        component:()=> import("@/views/Profile/Index.vue"),
        meta:{
          icon: 'carbon:user-profile',
          title: 'profile',
          rank:2
        }
      },
      {
        path: '/info',
        name:'info',
        component:()=> import("@/views/Info/Index.vue"),
        meta:{
          icon: 'bi:info-circle',
          title: 'info',
          rank:5
        }
      },
    ]
  },
]


export default publicRoutes
