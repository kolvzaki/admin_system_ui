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
      roles: ['sys_root']
    },
    children:[
      {
        path: '/system/user',
        name: 'user_manage',
        component: ()=>import('@/views/System/User/Index.vue'),
        meta:{
          title: 'userManage',
          icon: 'emojione:blond-haired-person-medium-light-skin-tone',
          roles: ['sys:root']
        },

      },
      {
        path: '/system/playground',
        name: 'playground_manage',
        component: ()=>import('@/views/System/Playground/Index.vue'),
        meta:{
          title: 'playGroundManage',
          icon: 'noto:umbrella-on-ground',
          roles: ['sys:root']
        },

      },
      {
        path: '/system/equipment',
        name: 'equipment_manage',
        component: ()=>import('@/views/System/Equipment/Index.vue'),
        meta:{
          title: 'equipmentManage',
          icon: 'emojione:pool-8-ball',
          roles: ['sys:root']
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
