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
          <el-button :size="componentSize" type="success">
            Create
          </el-button>
          <el-button :size="componentSize" type="warning">Reset</el-button>
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
            {{ global.formatDate(scope.row.lastLoginTime) }}
          </template>
        </el-table-column>
        <!--        <el-table-column prop="createdTime" :label="i18nUserQuery('createdTime')" width="200" align="center">
                  <template #default="scope">
                    {{global.formatDate(scope.row.createdTime)}}
                  </template>
                </el-table-column>
                <el-table-column prop="isDeleted" :label="i18nUserQuery('isDeleted')" align="center" width="100">
                  <template #default="scope">
                    <el-tag v-if="scope.row.isDeleted === 1">
                      {{i18nDeleteStatus('exists')}}
                    </el-tag>
                    <el-tag v-else>
                      {{i18nDeleteStatus('deleted')}}
                    </el-tag>
                  </template>
                </el-table-column>-->
        <el-table-column align="center" :label="i18nUserQuery('isAvailable')">
          <template #default="scope">
            <el-switch v-model="scope.row.isAvailable"
                       :size="componentSize"
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
            <el-tooltip placement="left" content="update">
              <el-button icon="edit" type="primary" :size="componentSize" />
            </el-tooltip>
            <el-tooltip placement="right" content="delete">
              <el-button type="danger" icon="delete" :size="componentSize" />
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import useModel from "./hooks/useModel";

import { i18nGender, i18nProfile, i18nUserQuery, i18nDeleteStatus, watchSwitchLang } from "@/utils/i18n";
import { onMounted, ref } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { getUsers } from "@/api";
import globalHooks from "@/utils/globalHooks";

const componentSize = ref("mini");

const model = useModel();
const global = globalHooks();

const query = model.query;
const queryOptions = model.queryOptions;

const inputList = ["username", "email", "mobile"];
const isInput = (o: string) => {
  return inputList.indexOf(o) !== -1;
};
const optionsList = ["isAvailable", "gender", "isDeleted"];
const isQueryOptions = (o: string) => {
  return optionsList.indexOf(o) !== -1;
};

const pageQuery = ["page", "size"];
const isPage = (o: string) => {
  return pageQuery.indexOf(o) !== -1;
};

const tableData = ref([]);
const total = ref(0);

onMounted(async () => {
  await getUsers(query).then(res => {
    const { data } = res;
    tableData.value = data.list;
    total.value = data.total || 0;
  }).catch(err => {
    console.log(err);
  });
  console.log(tableData.value);
});

const queryUser = async () => {
  await getUsers(query).then(res => {
    const { data } = res;
    tableData.value = data.list;
    total.value = data.total || 0;
  }).catch(err => {
    console.log(err);
  });
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
}

</style>
