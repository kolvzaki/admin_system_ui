<template>
  <div class="search-container" :class="{show: isShow}" @click.stop="showInput">
    <svg-icon icon="flat-color-icons:search" class-name="navbar-icon"></svg-icon>
    <el-select ref="headerSearchSelectRef" class="header-search-select"
       filterable  default-first-option remote :remote-method="querySearch"
       placeholder="search" @change="handleChange"       v-model="search">
      <el-option v-for="item in 5" :key="item" :label="item" :value="5">

      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">

import SvgIcon from "@/components/common/SvgIcon.vue";
import { ref } from "vue";

const isShow = ref(true);
const search = ref("");
const showInput = () => {
  isShow.value = !isShow.value;
};
const querySearch = ()=>{

};
const handleChange= ()=>{
  console.log('search change');
}
</script>

<style scoped lang="scss">
.search-container {
  @apply flex;

  .header-search-select{
    @apply inline-block bg-transparent ;
    transition: width .3s;
    width:0;
    ::v-deep(.el-input__inner){
      border-radius: 0;
      border: 0;
      padding: 0;
      box-shadow: none !important;
      background: none;
      border-bottom: 1px solid #000000;
    }
  }
  &.show{
    .header-search-select{
      @apply ml-2;
      width: 200px;
    }
  }
}



</style>
