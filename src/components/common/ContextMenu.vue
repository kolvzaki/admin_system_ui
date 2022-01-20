<template>
  <ul class="context-menu-container">
    <li @click="handleRefresh">{{i18nContext('refresh')}}</li>
    <li @click="handleCloseRight">{{i18nContext('closeRight')}}</li>
    <li @click="handleCloseAll">{{i18nContext('closeAll')}}</li>
  </ul>
</template>

<script setup>
import { i18nContext } from "@/utils/i18n";

defineProps({
  index:{
    type:Number,
    required:false
  }
})

const handleRefresh = () =>{

}
const handleCloseRight= ()=>{

}
const handleCloseAll = ()=>{

}

</script>

<style scoped lang="scss">
.context-menu-container{
  @apply fixed z-50 py-2 text-base;
  background: var(--el-bg-color);
  color: var(--el-color-black);
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0 rgba(0,0,0,.5);
  list-style-type: none;
  li{
    @apply m-0 px-2 py-2 cursor-pointer;
    &:hover{
      animation: jello 1s;
      background: var(--el-background-color-base);
      color: var(--el-color-primary);
    }
  }
}
</style>
