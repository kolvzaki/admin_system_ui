<template>
  <div class="permission-contain">
    <div class="top-contain">
      <div class="query-contain">
        <el-input class="query" clearable v-model="query.param" :size="componentSize"/>
      </div>
      <el-button type="primary" :size="componentSize" @click="permissionQuery(query)">Search</el-button>
      <el-button type="success" :size="componentSize" @click="showCreateDialog">Create</el-button>
    </div>

    <div class="table-contain">

      <el-table :data="tableData" border style="width: 100%" highlight-current-row>
        <el-table-column prop="id" :label="i18nPermissionQuery('id')" align="center" width="150"></el-table-column>
        <el-table-column prop="name" :label="i18nPermissionQuery('name')" align="center" />
        <el-table-column prop="remark" :label="i18nPermissionQuery('remark')" align="center" />
        <el-table-column align="center">
          <template #default="scope">
            <el-button :size="componentSize" icon="refresh" @click="showUpdateDialog(scope.row)"
            ></el-button
            >
            <el-popconfirm
              @confirm="deletePermission(scope.row)"
              title="Are you sure to delete this permission?" icon="warning">
              <template #reference>
                <el-button
                  :size="componentSize"
                  icon="delete"
                  type="danger"
                ></el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-contain">
        <el-pagination
          :current-page="query.page" :page-size="query.size" :page-sizes="pageSizes"
          layout="total, sizes, prev, pager, next" :total="total" background
          @size-change="handleSizeChange" @current-change="handlePageChange"
        >
        </el-pagination>
      </div>

      <sys-dialog :is-show="dialogOption.isShow" :title="dialogOption.title"
                  @cancelDialog="cancelDialog"
                  :view="dialogOption.view" :p="dialogOption.p"/>

    </div>

  </div>
</template>

<script setup lang="ts">
import useGlobalHooks from '@/utils/globalHooks';
import {i18nPermissionQuery} from "@/utils/i18n";
import { defineAsyncComponent, markRaw, onMounted, ref } from "vue";

import usePermission from "@/views/System/Permission/hooks/usePermission";
import SysDialog from "@/components/common/SysDialog.vue";
import { IPermission } from "@/views/System/Permission/types/types";

const {componentSize,componentSizeOptions,pageSizes,dialogOption} = useGlobalHooks()
const {model,query,tableData,total,permissionQuery,permissionDelete} = usePermission()

const showCreateDialog = () =>{
  dialogOption.isShow = true
  dialogOption.title = 'Permission Create'
  dialogOption.view = markRaw(defineAsyncComponent(()=>import('@/views/System/Permission/Permission-Create.vue')))
}

const showUpdateDialog = (data:IPermission) =>{
  dialogOption.isShow = true
  dialogOption.title = 'Permission Update'
  dialogOption.view = markRaw(defineAsyncComponent(()=>import('@/views/System/Permission/Permission-Update.vue')))
  dialogOption.p = data
}

const deletePermission = async (data:IPermission) =>{
  await permissionDelete(data)
  permissionQuery(query)
}

const handleSizeChange = (val:number) =>{
  query.size = val
  permissionQuery(query)
}

const handlePageChange = (val:number) =>{
  query.page = val
  permissionQuery(query)
}

const cancelDialog = async() =>{
  dialogOption.isShow = false
  await permissionQuery(query)
}


onMounted(()=>{

})


</script>

<style scoped lang="scss">

.permission-contain{
  @apply w-full h-full overflow-hidden;
  transition: all ease 1s;

  .top-contain {
    @apply  w-full h-max flex flex-row flex-wrap;
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

  .pagination-contain{
    @apply w-max h-max mx-auto my-10 transition-all;
  }

}

</style>
