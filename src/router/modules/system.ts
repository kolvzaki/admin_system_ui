import {RouteRecordRaw} from "vue-router";
import layout from '@/layout/Index.vue'

const systemRoutes:RouteRecordRaw[] = [
  {
    path: '/system',
    redirect: '/system/user',
    component:layout,
    meta:{
      title: 'systemManage',
      icon: 'icon-park:computer',
      rank:4,
      roles: ['sys_admin']
    },
    children:[
      {
        path: '/system/user',
        name: 'user_manage',
        component: ()=>import('@/views/System/User/Index.vue'),
        meta:{
          title: 'userManage',
          icon: 'emojione:blond-haired-person-medium-light-skin-tone',
          roles: ['sys:admin']
        },

      },
      {
        path: '/system/playground',
        name: 'playground_manage',
        component: ()=>import('@/views/System/Playground/Index.vue'),
        meta:{
          title: 'playGroundManage',
          icon: 'noto:umbrella-on-ground',
          roles: ['sys:admin']
        },

      },
      {
        path: '/system/equipment',
        name: 'equipment_manage',
        component: ()=>import('@/views/System/Equipment/Index.vue'),
        meta:{
          title: 'equipmentManage',
          icon: 'emojione:pool-8-ball',
          roles: ['sys:admin']
        },
      }
    ]
  }
]
export default systemRoutes
