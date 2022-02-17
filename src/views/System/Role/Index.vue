<template>
  <div class="role-contain">
    <div class="top-contain">
      <div class="query-contain">
        <el-input class="query" clearable v-model="query.param" placeholder="Query Role" />
      </div>
      <el-button type="primary" :size="componentSize" @click="roleQuery">Search</el-button>
      <el-button type="success" :size="componentSize" @click="showCreateDialog">Create</el-button>
    </div>

    <div class="table-contain">
      <el-table :data="tableData" border style="width: 100%" highlight-current-row @row-click="switchRole">
        <el-table-column prop="id" :label="i18nRoleQuery('id')" align="center" width="150"></el-table-column>
        <el-table-column prop="name" :label="i18nRoleQuery('name')" align="center" />
        <el-table-column prop="remark" :label="i18nRoleQuery('remark')" align="center" />
        <el-table-column align="center">
          <template #default="scope">
            <el-button :size="componentSize" icon="refresh" @click.stop="showUpdateDialog(scope.row)"
            ></el-button
            >
            <el-popconfirm
              @confirm="roleDelete(scope.row)"
              title="Are you sure to delete this role?" icon="warning">
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
    </div>

    <div class="pagination-contain">
      <el-pagination
        :current-page="query.page" :page-size="query.size" :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next" :total="total" background
        @size-change="handleSizeChange" @current-change="handlePageChange"
      >
      </el-pagination>
    </div>

    <transition name="RolePermissionCardAnime" mode="in-out">
      <el-card class="permission-show-contain" v-show="showRolePermission">
        <template #header>
          <div class="card-header">
            <span class="title-contain"><svg-icon icon="icon-park-outline:permissions" class-name="title-icon"></svg-icon>Role-Permission</span>
            <div>
              <el-button type="primary" :size="componentSize" @click="saveRolePermission">Save</el-button>
              <el-button type="danger" icon="close" :size="componentSize" @click="showRolePermission = false"></el-button>
            </div>
          </div>
        </template>
        <div class="card-content">
          <transition-group name="tagsAnime">
            <el-tag class="permission-tags" v-for="o in RolePermissions" closable @close="handleClose(o.id)"
                    :key="o.id">
              <span class="tags-text">{{ o.name }}</span>
            </el-tag>
          </transition-group>
          <el-tag type="info" class="permission-tags" @click="showPermissionSelector" v-if="!showSelector">
            <svg-icon icon="akar-icons:plus"></svg-icon>
          </el-tag>
          <el-select class="selector-contain" v-model="newPermission" value-key="id" @change="addPermission" :size="componentSize"
                     v-else>
            <el-option
              v-for="item in allPermissions"
              :key="item.id"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
          <el-tag type="danger" style="height: 28px;" @click="closeSelector" v-if="showSelector">
            <svg-icon icon="akar-icons:cross" class="selector-icon"></svg-icon>
          </el-tag>
        </div>
      </el-card>
    </transition>

    <sys-dialog :is-show="dialogOption.isShow" :title="dialogOption.title" :view="dialogOption.view" :p="dialogOption.p"
                @cancelDialog="cancelDialog"></sys-dialog>

  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, markRaw, onMounted, reactive, ref } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import SysDialog from "@/components/common/SysDialog.vue";
import { ElMessage as message } from "element-plus";

import { i18nRoleQuery } from "@/utils/i18n";
import { IRole, IRoleQuery } from "@/views/System/Role/types/types";

import useGlobalHooks from "@/utils/globalHooks";

const { componentSize, pageSizes, dialogOption } = useGlobalHooks();

import useRole from "@/views/System/Role/hooks/useRole";

const { query, tableData, total, roleQuery, roleDelete } = useRole();

import useRolePermission from "@/views/System/Role/hooks/useRolePermission";
import { IPermission } from "@/views/System/Permission/types/types";

const {
  allPermissions, RolePermissions, showRolePermission, newPermission,
  getRolePermissions, getAllPermissions, initNewPermission
} = useRolePermission();

const showCreateDialog = () => {
  dialogOption.isShow = true;
  dialogOption.title = "Role Create";
  dialogOption.view = markRaw(defineAsyncComponent(() => import("./Role-Create.vue")));
};

const showUpdateDialog = (data: IRole) => {
  dialogOption.isShow = true;
  dialogOption.title = "Role Update";
  dialogOption.view = markRaw(defineAsyncComponent(() => import("./Role-Update.vue")));
  dialogOption.p = data;
};

const cancelDialog = () => {
  dialogOption.isShow = false;
  roleQuery(query)
};

const switchRole = (row: IRole) => {
  showRolePermission.value = true;
  getRolePermissions(row.id);
};

const handleSizeChange = (val: number) => {
  query.size = val;
  roleQuery(query);
};

const handlePageChange = (val: number) => {
  query.page = val;
  roleQuery(query);
};

onMounted(() => {
  roleQuery(query);
});

const showSelector = ref(false);
const showPermissionSelector = () => {
  showSelector.value = true;
};
const closeSelector = () => {
  showSelector.value = false;
};

const addPermission = () => {

  for (let i of RolePermissions.value) {
    if (i.id === newPermission.value.id) {
      showSelector.value = false;
      initNewPermission();
      return;
    }
  }
  RolePermissions.value.push(newPermission.value);
  showSelector.value = false;
  initNewPermission();
};

const handleClose = (id: string | number) => {
  RolePermissions.value.forEach((val: IPermission, index: number, arr: IPermission[]) => {
    if (val.id === id) {
      arr.splice(index, 1);
    }
  });
};

//TODO: Save Role's Permissions while push Save Button.
const saveRolePermission = () => {
  message.success("Save success");
};

</script>

<style scoped lang="scss">
@import "src/views/System/Role/Style/Index.scss";

</style>
