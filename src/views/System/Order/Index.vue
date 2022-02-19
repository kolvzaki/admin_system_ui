<template>
  <div class="order-manage-contain">
    <div class="top-contain">
      <el-form label-width="100px"  class="query-form-contain" :size="componentSize" v-model="OrderQuery">
        <el-form-item v-for="o in Object.keys(OrderQuery)" :label="o" class="query-item-contain">
          <el-date-picker v-if="timeSelectField.indexOf(o) !== -1" v-model="OrderQuery[o]"></el-date-picker>
          <el-select v-else-if="o === 'status'" v-model="OrderQuery[o]"></el-select>
          <el-input v-else v-model="OrderQuery[o]"></el-input>
        </el-form-item >
        <el-form-item class="query-item-contain button-contain">
          <el-button :size="componentSize" type="primary" class="hvr-pulse">Search</el-button>
          <el-button :size="componentSize" type="success" class="hvr-pulse">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import globalHooks from "@/utils/globalHooks";
import useOrder from "@/views/System/Order/hooks/useOrder";

const {componentSize} = globalHooks()
const { OrderQuery,timeSelectField } = useOrder()

</script>

<style scoped lang="scss">
.order-manage-contain{
  @apply w-full h-full overflow-hidden;
  .top-contain{
    @apply w-full h-max;
    .query-form-contain{
      @apply w-full h-max  flex flex-row flex-wrap;
      .query-item-contain{
        @apply h-max w-max p-2 mb-0 mx-2;
        :deep(.el-form-item__label){
          @apply text-lg pr-2;
        }
      }
    }
  }

}

</style>
