<template>
  <div class="ground-manage-contain">
    <div class="top-contain">
      <el-form label-width="60px" class="query-form-contain" inline :size="componentSize" v-model="GroundQuery">
        <el-form-item v-for="o in Object.keys(GroundQuery)" :label="i18nGroundQuery(o)">
          <el-input v-model="GroundQuery[o]" v-if="isInput(o)" clearable></el-input>
          <el-select v-else-if="isQueryOptions(o)" v-model="GroundQuery[o]" clearable>
            <el-option v-for="opt in queryOption[o]" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" :size="componentSize" @click="queryGround(GroundQuery)">
            {{ SysI18n("button.search") }}
          </el-button>
          <el-button type="success" icon="plus" :size="componentSize" @click="showCreateDialog">{{ SysI18n("button.create") }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-divider>
      <svg-icon icon="emojione-v1:star"></svg-icon>
    </el-divider>

    <div class="table-contain">
      <el-table :data="tableData" border style="width: 100%" highlight-current-row>
        <el-table-column v-for="o in Object.keys(GroundModel)" :prop="o" :label="i18nGroundQuery(o)" align="center">
          <template #default="scope" v-if="isQueryOptions(o)">
            <el-tag v-if="o === 'type'">
              {{ scope.row.type }}
            </el-tag>
            <el-tag v-else-if="o === 'isDeleted'" :type=" scope.row.isDeleted === 1?'success':'danger' ">
              {{ i18nDeleteStatus(scope.row.isDeleted === 1 ? "exists" : "deleted") }}
            </el-tag>
            <el-switch v-else
                       v-model="scope.row.isAvailable"
                       active-color="#13ce66" inactive-color="#ff4949"
                       :active-value="1" :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column align="center">
          <template #default="scope">
            <el-button :size="componentSize" icon="refresh" @click="showUpdateDialog(scope.row)" />
            <el-popconfirm
              title="Are you sure to delete this Playground?" icon="warning">
              <template #reference>
                <el-button
                  :size="componentSize"
                  icon="delete"
                  type="danger" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-contain">
      <el-pagination
        :current-page="GroundQuery.page" :page-size="GroundQuery.size" :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next" :total="total" background
        @size-change="handleSizeChange" @current-change="handlePageChange"
      >
      </el-pagination>
    </div>

    <sys-dialog :is-show="dialogOption.isShow" :title="dialogOption.title"
                @cancelDialog="cancelDialog"
                :view="dialogOption.view" :p="dialogOption.p"/>

  </div>
</template>

<script setup lang="ts">
import globalHooks from "@/utils/globalHooks";
import useGround from "@/views/System/Playground/hooks/useGround";
import { i18nGroundQuery, SysI18n, i18nAccountStatus, i18nDeleteStatus } from "@/utils/i18n";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { defineAsyncComponent, markRaw, onMounted } from "vue";
import SysDialog from "@/components/common/SysDialog.vue";
import { IGround } from "@/views/System/Playground/types/types";

const { componentSize, isDeletedOptions, avaOptions, pageSizes, dialogOption } = globalHooks();
const { GroundModel, GroundQuery, isQueryOptions, isInput, queryOption, tableData, total, queryGround } = useGround();

onMounted(async () => {
  await queryGround(GroundQuery);
});

const showCreateDialog = () =>{
  dialogOption.isShow = true
  dialogOption.title = 'Ground Create'
  dialogOption.view = markRaw(defineAsyncComponent(()=>import('@/views/System/Playground/Ground-Create.vue')))
}

const showUpdateDialog = (data:IGround) =>{
  dialogOption.isShow = true
  dialogOption.title = 'Ground Update'
  dialogOption.view = markRaw(defineAsyncComponent(()=>import('@/views/System/Playground/Ground-Update.vue')))
  dialogOption.p = data
}

const cancelDialog = () =>{
  dialogOption.isShow = false
}

const handleSizeChange = (val: number) => {
  GroundQuery.size = val;
  queryGround(GroundQuery);
};

const handlePageChange = (val: number) => {
  GroundQuery.page = val;
  queryGround(GroundQuery);
};

const check = () => {
  console.log(tableData.value);
};

</script>

<style scoped lang="scss">
.ground-manage-contain {
  @apply w-full h-full overflow-hidden;
  .top-contain {
    @apply w-max h-max my-2 ;
    margin: 0 auto;
  }

  .table-contain {
    @apply w-full h-max mt-5;
  }

  .pagination-contain {
    @apply w-max h-max mx-auto my-5 transition-all;
  }
}


</style>
