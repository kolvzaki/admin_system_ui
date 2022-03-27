<template>
  <div class="user-manage-contain">
    <div class="top-contain">
      <el-form label-width="80px" class="query-form-contain" :size="componentSize" inline>
        <el-form-item v-for="o in Object.keys(query)" :label="i18nUserQuery(o)">
          <el-input v-model="query[o]" v-if="isInput(o)" clearable></el-input>
          <el-select v-else-if="isQueryOptions(o)" v-model="query[o]" clearable>
            <el-option v-for="opt in queryOptions[o]" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: -10px;">
          <el-button :size="componentSize" type="primary" icon="search" @click="queryUser"></el-button>
          <el-button :size="componentSize" type="success" @click="createUser" icon="plus" />
        </el-form-item>
      </el-form>
    </div>

    <el-divider>
      <svg-icon icon="emojione-v1:star"></svg-icon>
    </el-divider>

    <div class="table-contain">
      <el-table class="user-table" :data="tableData" border>
        <el-table-column prop="id" label="id" width="50" align="center" />
        <!--        <el-table-column prop="avatar" :label="i18nUserQuery('avatar')"></el-table-column>-->
        <el-table-column prop="username" :label="i18nUserQuery('username')" align="center" />
        <el-table-column prop="nickname" :label="i18nUserQuery('nickname')" align="center" />
        <el-table-column prop="mobile" :label="i18nUserQuery('mobile')" align="center"></el-table-column>
        <el-table-column prop="email" :label="i18nUserQuery('email')" align="center"></el-table-column>
        <el-table-column :label="i18nUserQuery('lastLoginTime')" width="200" align="center">
          <template #default="scope">
            {{ formatDate(scope.row.lastLoginTime) }}
          </template>
        </el-table-column>
<!--        <el-table-column prop="createdTime" :label="i18nUserQuery('createdTime')" width="200" align="center">
          <template #default="scope">
            {{ formatDate(scope.row.createdTime) }}
          </template>
        </el-table-column>-->
        <el-table-column prop="isDeleted" :label="i18nUserQuery('isDeleted')" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.isDeleted === 1">
              {{ i18nDeleteStatus("exists") }}
            </el-tag>
            <el-tag v-else type="danger">
              {{ i18nDeleteStatus("deleted") }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="i18nUserQuery('role')" prop="role_name">

        </el-table-column>

        <el-table-column align="center" :label="i18nUserQuery('isAvailable')">
          <template #default="scope">
            <el-switch v-model="scope.row.isAvailable"
                       :size="componentSize" @change="setAvailableStatus(scope.row)"
                       :active-value="1" :inactive-value="0"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       inline-prompt
                       active-icon="close" inactive-icon="check"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #default="scope">
            <el-button icon="edit" type="primary" :size="componentSize" @click="updateUser(scope.row)" />
            <el-button type="danger" icon="delete" v-if="scope.row.isDeleted === 1 " :size="componentSize"
                       @click="deleteUser(scope.row)" />
            <el-button type="success" icon="check" v-else :size="componentSize"
                       @click="restoreUser(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-contain">
      <el-pagination background
                     @size-change="handleSizeChange" @current-change="handlePageChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :page-size="query.size" :current-page="query.page" :total="total" :page-sizes="pageSizes">
      </el-pagination>
    </div>


    <sys-dialog :is-show="dialogOption.isShow" :title="dialogOption.title" :view="dialogOption.view" :p="dialogOption.p"
                @cancelDialog="cancelDialog"/>



  </div>
</template>

<script setup lang="ts">
import useModel from "./hooks/useModel";
import { i18nGender, i18nProfile, i18nUserQuery, i18nDeleteStatus, SysI18n, watchSwitchLang } from "@/utils/i18n";
import { defineAsyncComponent, onMounted, ref, markRaw, computed, watch, reactive } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { DeleteUser, disableUser, getUsers } from "@/api";
import SysDialog from "@/components/common/SysDialog.vue";
import globalHooks from "@/utils/globalHooks";
import { IUser } from "@/views/System/User/types/types";
import { ElMessage as message } from "element-plus";
import { useRoute } from "vue-router";

const { formatDate, pageSizes, dialogOption, componentSize } = globalHooks();

const { tableData, total, query, queryOptions } = useModel();

const route = useRoute()

onMounted(async () => {
  if(route.query.username){
    query.username = String(route.query.username)
  }
  await getUsers(query).then(res => {
    const { data } = res;
    tableData.value = data.list;
    total.value = data.total || 0;
    //console.log(res.data);
  }).catch(err => {
    console.log(err);
    message.error(err)
  });
});

const createUser = () => {
  dialogOption.isShow = true;
  dialogOption.title = "User Create";
  dialogOption.view = markRaw(defineAsyncComponent(() => import("./User-Create.vue")));
};

const updateUser = (data: IUser) => {
  dialogOption.isShow = true;
  dialogOption.title = "User Update";
  dialogOption.p = data;
  dialogOption.view = markRaw(defineAsyncComponent(() => import("./User-Update.vue")));
};

const deleteUser = (data: IUser) => {
  DeleteUser(data.username, 0).then(res => {
    message.success("删除成功");
    queryUser();
  })
    .then(err => {
      console.log(err);
    });
};

const restoreUser = (data: IUser) => {
  DeleteUser(data.username, 1).then(res => {
    message.success("还原成功");
    queryUser();
  })
    .then(err => {
      console.log(err);
    });
};

const setAvailableStatus = async(data:IUser) => {
  await disableUser(data).then(res=>{
    message.success('Success')
  }).catch(err=>{
    console.log(err);
  })
  await queryUser()
}

const queryUser = async () => {
  await getUsers(query).then(res => {
    const { data } = res;
    tableData.value = data.list;
    total.value = data.total;
  }).catch(err => {
    console.log(err);
  });
};

const cancelDialog = async() => {
  dialogOption.isShow = false;
  await queryUser();
};

const inputList = ["username", "email", "mobile"];
const isInput = (o: string) => {
  return inputList.indexOf(o) !== -1;
};
const optionsList = ["isAvailable", "gender", "isDeleted",'role'];
const isQueryOptions = (o: string) => {
  return optionsList.indexOf(o) !== -1;
};

const pageQuery = ["page", "size"];
const isPage = (o: string) => {
  return pageQuery.indexOf(o) !== -1;
};


const handleSizeChange = async(val: number) => {
  query.size = val;
  await queryUser();
};

const handlePageChange = async(val: number) => {
  query.page = val;
  await queryUser();
};


</script>

<style scoped lang="scss">
.user-manage-contain {
  @apply w-full h-full;
  .top-contain {
    @apply w-auto h-auto;

  }

  .table-contain {
    @apply transition-all;
  }

  .button-contain {
    @apply w-max h-max;
    margin: 0 auto;
  }

  .pagination-contain {
    @apply w-max h-max pt-5;
    margin: 0 auto;
  }
}

</style>
