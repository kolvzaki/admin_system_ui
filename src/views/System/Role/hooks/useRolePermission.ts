import { onMounted, ref } from "vue";
import { IPermission } from "@/views/System/Permission/types/types";
import { getRolePermissionsService } from "@/api/role";
import { getAll } from "@/api/permission";

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
    getAllPermissions
  }
}
