<template>
  <div class="order-manage-contain">
    <div class="top-contain">
      <el-form label-width="120px"  class="query-form-contain" :size="componentSize" v-model="OrderQuery">
        <el-form-item v-for="o in Object.keys(OrderQuery)" :label="i18nOrderQuery(o)" class="query-item-contain">
          <el-date-picker v-if="timeSelectField.indexOf(o) !== -1" v-model="OrderQuery[o]"></el-date-picker>
          <el-select v-else-if="o === 'status'" v-model="OrderQuery[o]" clearable>
            <el-option v-for="opt in OrderStatusOptions" :key="opt.id" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
          <el-input v-else v-model="OrderQuery[o]"></el-input>
        </el-form-item >
        <el-form-item class="query-item-contain button-contain">
          <el-button :size="componentSize" type="primary" class="hvr-pulse">Search</el-button>
          <el-button :size="componentSize" type="success" class="hvr-pulse">Create</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-divider>
      <svg-icon icon="emojione-v1:star" ></svg-icon>
    </el-divider>

    <div class="table-contain">
      <el-table :data="tableData" border highlight-current-row>
        <el-table-column v-for="o in Object.keys(OrderModel)" :prop="o" :label="i18nOrderModel(o)" align="center">
          <template #default="scope">
            <el-tag v-if="o === 'status'" :type="tagsType(scope.row.status)">
              {{ getLabelByValue(scope.row.status) }}
            </el-tag>
            <span v-else-if="o!=='createdTime'">{{scope.row[o]}}</span>
            <span v-else>
            {{ scope.row[o] }}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Operation">
          <template #default="scope">
            <el-button type="primary" icon="Document" :size="componentSize"></el-button>
            <el-button type="default" icon="check" :size="componentSize"></el-button>
            <el-button type="danger" icon="delete" :size="componentSize"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script setup lang="ts">
import globalHooks from "@/utils/globalHooks";
import useOrder from "@/views/System/Order/hooks/useOrder";
import {i18nOrderQuery,i18nOrderModel} from '@/utils/i18n'

const {componentSize} = globalHooks()
const { OrderQuery,timeSelectField,OrderStatusOptions,tableData,total,OrderModel,getLabelByValue } = useOrder()

const tagsType = (status:number) =>{
  switch (status) {
    case 0:{
      return 'info';
    }
    case 1:{
      return 'default'
    }
    case 2:{
      return 'warning'
    }
    case 3:{
      return 'success'
    }
    case -1:{
      return 'danger'
    }
    default:{
      return 'default'
    }
  }
}


</script>

<style scoped lang="scss">
.order-manage-contain{
  @apply w-full h-full overflow-hidden;
  .top-contain{
    @apply w-full h-max;
    .query-form-contain{
      @apply w-full h-max flex flex-row flex-wrap;
      .query-item-contain{
        @apply h-max w-max;
      }
    }
  }

  .table-contain{
    @apply w-full h-max mt-10;

  }
}

</style>
