import { IPermissionQuery, IPermission } from "@/views/System/Permission/types/types";
import { queryPermission,createPermission,updatePermission,deletePermission } from "@/api/permission";
import { onMounted, reactive, ref } from "vue";
import { ElMessage as message } from "element-plus";

export default function(){

  const model:IPermission = reactive({
    id: '',
    name: '',
    remark: ''
  })

  const query:IPermissionQuery = reactive( {
    page: 1,
    size: 5,
    param: ''
  })

  const tableData = ref<IPermission[]>([])
  const total = ref(0)

  const initModel = () =>{
    model.id =''
    model.name = ''
    model.remark = ''
  }

  const permissionQuery = (query:IPermissionQuery) =>{
    queryPermission(query).then(res=>{
      const {data} = res
      tableData.value = data.list
      total.value = data.total
    }).catch(err=>{
      console.log(err);
    })
  }

  const permissionCreate = async(model:IPermission) =>{
    await createPermission(model).then(res=>{
      message.success('Create Success')
      //console.log(res);
      initModel()
    }).catch(err=>{
      console.log(err);
    })
    permissionQuery(query)
  }

  const permissionUpdate = async(model:IPermission) =>{
    await updatePermission(model).then(res=>{
      message.success('Update Success')
      //console.log(res);
    }).catch(err=>{
      console.log(err);
    })
    permissionQuery(query)
  }

  const permissionDelete = async (model:IPermission) =>{
    await deletePermission(model).then(res=>{
      message.success('Delete Success')
      //console.log(res);
    }).catch(err=>{
      console.log(err);
    })
    permissionQuery(query)
  }

  onMounted(()=>{
    permissionQuery(query)
  })

  return{
    model,
    query,
    tableData,
    total,
    permissionQuery,
    permissionCreate,
    permissionUpdate,
    permissionDelete
  }

}
