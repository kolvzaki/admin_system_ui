import { onMounted, ref } from "vue";
import { IPermission } from "@/views/System/Permission/types/types";
import { distributePermission, getRolePermissionsService } from "@/api/role";
import { getAll } from "@/api/permission";
import { ElMessage } from "element-plus";

export default function(){

  const allPermissions = ref<IPermission[]>([])
  let RolePermissions = ref<IPermission[]>([])
  const showRolePermission = ref(false)
  const newPermission = ref<IPermission>({
    id:'',
    name:'',
    remark: ''
  })

  const getRolePermissions = async (id:number) =>{
    await getRolePermissionsService(id).then(res=>{
      RolePermissions.value = res.data
    }).catch(err=>{
      console.log(err);
    })
  }

  const getAllPermissions = () =>{
    getAll().then(res=>{
      const {data} = res
      allPermissions.value = data || []
    }).catch(err=>{
      console.log(err);
    })
  }

  const initNewPermission = () =>{
    newPermission.value = {
      id:'',
      name:'',
      remark: ''
    }
  }

  const permissionDistribute = async (permissions:IPermission[],rid:number) =>{
    await distributePermission(permissions,rid).then(res=>{
      ElMessage.success('Distribute Success!')
    }).catch(err=>{
      console.log(err);
    })
  }

  onMounted(()=>{
    getAllPermissions()
  })

  return{
    allPermissions,
    RolePermissions,
    showRolePermission,
    newPermission,

    initNewPermission,
    getRolePermissions,
    getAllPermissions,

    permissionDistribute
  }
}
