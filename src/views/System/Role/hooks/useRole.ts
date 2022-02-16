import { reactive } from "vue";

export default function(){

  interface IRole{
    name:string,
    remark:string
  }

  let RoleModel:IRole = reactive({
    name:"",
    remark:""
  })

  const CreateRole = (data:IRole) =>{
    console.log(data);
  }

  const UpdateRole = (data:IRole)=>{
    console.log(data);
  }

  return {
    RoleModel,
    CreateRole,
    UpdateRole
  }

}
