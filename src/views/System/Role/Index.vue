<template>
  <div class="role-contain">
    <div class="top-contain">
      <div class="query-contain">
        <el-input class="query" clearable v-model="query" :size="componentSize" placeholder="Query Role Name" />
        <el-input clearable class="query" :size="componentSize"></el-input>
      </div>
      <el-button type="primary" :size="componentSize">Search</el-button>
      <el-button type="success" :size="componentSize" @click="showCreateDialog">Create</el-button>
    </div>

    <div class="table-contain">
      <el-table :data="tableData" border style="width: 100%" highlight-current-row @row-click="switchRole">
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column prop="date" label="Date" align="center" />
        <el-table-column prop="name" label="Name" align="center" />
        <el-table-column prop="address" label="Address" align="center" />
        <el-table-column align="center">
          <template #default="scope">
            <el-button :size="componentSize" icon="refresh" @click="showUpdateDialog"
            ></el-button
            >
            <el-button
              :size="componentSize"
              icon="delete"
              type="danger"
            ></el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-card class="permission-show-contain">
      <template #header>
        <div class="card-header">
          <span>
            <svg-icon icon="icon-park-outline:permissions" class-name="title-icon"></svg-icon>
            Role-Permission
          </span>
          <el-button type="primary" :size="componentSize" @click="saveRolePermission">Save</el-button>
        </div>
      </template>
      <div class="card-content" v-if="RolePermissions.length !== 0">
        <transition-group name="tagsAnime">
          <el-tag class="permission-tags" v-for="o in RolePermissions" closable @close="handleClose(o.id)" :key="o.id">
            <span class="tags-text">{{o.name}}</span>
          </el-tag>
        </transition-group>
        <el-tag type="info" class="permission-tags" @click="showPermissionSelector" v-if="!showSelector">
          <svg-icon icon="akar-icons:plus"></svg-icon>
        </el-tag>
        <el-select clearable class="selector-contain" v-model="newPermission" @change="addPermission" :size="componentSize" v-else>
          <el-option
            v-for="item in allPermissions"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
        <el-tag type="danger" style="height: 28px;" @click="closeSelector" v-if="showSelector">
          <svg-icon icon="akar-icons:cross" class="selector-icon" ></svg-icon>
        </el-tag>
      </div>
    </el-card>

    <sys-dialog :is-show="isShow" :title="title" :view="view" @cancelDialog="cancelDialog"></sys-dialog>

  </div>
</template>

<script setup >
import { defineAsyncComponent, markRaw, onMounted, ref } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import globalHooks from "@/utils/globalHooks";
import SysDialog from "@/components/common/SysDialog.vue";
import {ElMessage as message} from "element-plus";
import {getRolePermissions} from "@/api/role";
import {getAllPermissions} from "@/api/permission"

const SysHooks = globalHooks()

const componentSize = ref("mini");
const query = ref("");
const isShow = ref(false)
const title = ref('')
const view = ref({})

const showCreateDialog = () =>{
  isShow.value = true
  title.value = "Role Create"
  view.value = markRaw(defineAsyncComponent(()=>import("./Role-Create.vue")))
}

const showUpdateDialog = () =>{
  isShow.value = true
  title.value = "Role Update"
  view.value = markRaw(defineAsyncComponent(()=>import("./Role-Update.vue")))
}

const cancelDialog = () =>{
  isShow.value = false
}

const switchRole = (row)=>{
  getRolePermissions(row.id).then(res=>{
    RolePermissions.value = res.data.permissions
  }).catch(err=>{
    console.log(err);
  })
}

const allPermissions = ref([])
onMounted(()=>{
  getAllPermissions().then(res=>{
    const {data} = res
    allPermissions.value = data?.permissions || []
  })
})

const showSelector = ref(false)
const showPermissionSelector = ()=>{
  showSelector.value = true
}
const closeSelector = ()=>{
  showSelector.value = false
}
const tableData = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];

let RolePermissions = ref([])
const newPermission = ref('')
const addPermission = ()=>{
  for (let i of RolePermissions.value){
    if (i === newPermission.value){
      showSelector.value = false
      newPermission.value = ""
      return;
    }
  }
  RolePermissions.value.push(newPermission.value)
  showSelector.value = false
  newPermission.value = ""
}

const handleClose = (id) =>{
  RolePermissions.value.forEach((val,index,arr)=>{
    if (val.id === id){
      arr.splice(index,1)
    }
  })
}

const saveRolePermission = ()=>{
  message.success('Save success')
}

</script>

<style scoped lang="scss">
.role-contain {
  @apply w-full h-full;
  transition: all ease .5s;

  .top-contain {
    @apply w-full h-max flex;
    .query-contain {
      @apply w-max h-max flex;
      .query {
        @apply mr-2;
      }
    }
  }

  .table-contain {
    @apply w-full h-max mt-3;
  }

  .permission-show-contain {
    @apply w-full h-max mt-3;
    .card-header{
      @apply h-5 flex items-center justify-between;
    }
    .card-content{
      @apply w-full flex items-center;
      height: 60px;
      .selector-contain{
        @apply w-max h-max;
        .selector-icon{
          @apply transition-all cursor-pointer inline-block w-max h-max p-1 relative right-2;
          &:hover{
            color: red;
          }
        }
      }
      .permission-tags{
        @apply mx-2 cursor-default transition-all;
        transition: all ease-in .3s;
        &:hover{
          @apply text-white;
          background: var(--el-color-primary-light-4);
          &:last-child{
            @apply cursor-pointer text-white;
          }
        }
        .tags-text{
          @apply text-base inline-block;
        }
      }
    }
  }
}

.tagsAnime-enter-from,
.tagsAnime-leave-to{
  opacity: 0;
}

.tagsAnime-leave-active {
  position: relative;
}


</style>
