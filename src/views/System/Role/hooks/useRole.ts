import { reactive, ref, defineEmits, onBeforeMount } from "vue";
import { createRole, deleteRole, queryRole, updateRole } from "@/api/role";
import { IRole, IRoleQuery } from "@/views/System/Role/types/types";
import useRolePermission from "@/views/System/Role/hooks/useRolePermission";
import { ElMessage as message } from "element-plus";
import { IPermission } from "@/views/System/Permission/types/types";

export default function() {

  let RoleModel: IRole = reactive({
    id: 0,
    name: "",
    remark: ""
  });

  const { RolePermissions, showRolePermission } = useRolePermission();

  const tableData = ref([]);
  const total = ref(0);


  const query = reactive<IRoleQuery>({
    page: 1,
    size: 5,
    param: ""
  });

  const roleQuery = (query: IRoleQuery) => {
    queryRole(query).then(res => {
      const { data } = res;
      tableData.value = data.list;
      total.value = data.total;
    }).catch(err => {
      console.log(err);
    });
    RolePermissions.value = [];
    showRolePermission.value = false;
  };

  const roleDelete = async (data: IRole) => {
    await deleteRole(data).then(res => {
      console.log(res);
      message.success("Delete success");
    }).catch(err => {
      console.log(err);
    });
    roleQuery(query);
  };

  const roleUpdate = async (data: IRole) => {
    await updateRole(data).then(res => {
      message.success("Update success");
    }).catch(err => {
      console.log(err);
    });

  };

  const roleCreate = async (data: IRole) => {
    await createRole(data).then(res => {
      message.success("Create Success");
    }).catch(err => {
      console.log(err);
    });
  };


  return {
    RoleModel,
    query,
    tableData,
    total,

    roleQuery,
    roleDelete,
    roleUpdate,
    roleCreate,

  };

}
