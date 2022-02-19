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
      roles: ['sys_root','sys:guard']
    },
    children:[
      {
        path: '/system/user',
        name: 'user_manage',
        component: ()=>import('@/views/System/User/Index.vue'),
        meta:{
          title: 'userManage',
          icon: 'emojione:blond-haired-person-medium-light-skin-tone',
          roles: ['sys:root','sys:guard']
        },

      },
      {
        path: '/system/playground',
        name: 'playground_manage',
        component: ()=>import('@/views/System/Playground/Index.vue'),
        meta:{
          title: 'playGroundManage',
          icon: 'noto:umbrella-on-ground',
          roles: ['sys:root','sys:guard']
        },

      },
      {
        path: '/system/order',
        name: 'order_manage',
        component: () => import('@/views/System/Order/Index.vue'),
        meta:{
          title: 'orderManage',
          icon: 'icon-park-outline:transaction-order',
          roles: ['sys:root','sys:guard']
        }
      },
      {
        path: '/system/equipment',
        name: 'equipment_manage',
        component: ()=>import('@/views/System/Equipment/Index.vue'),
        meta:{
          title: 'equipmentManage',
          icon: 'emojione:pool-8-ball',
          roles: ['sys:root','sys:guard']
        },
      },
      {
        path:'/system/role',
        name: 'role_manage',
        component: ()=>import("@/views/System/Role/Index.vue"),
        meta:{
          title: 'roleManage',
          icon: 'carbon:user-role',
          roles: ['sys:root']
        }
      },
      {
        path:'/system/permission',
        name: 'permission_manage',
        component: ()=>import("@/views/System/Permission/Index.vue"),
        meta:{
          title: 'permissionManage',
          icon: 'icon-park:permissions',
          roles: ['sys:root']
        }
      }
    ]
  }
]
export default systemRoutes
