<template>
  <ul class="context-menu-container">
    <li @click="handleRefresh">{{i18nContext('refresh')}}</li>
    <li @click="handleCloseRight">{{i18nContext('closeRight')}}</li>
    <li @click="handleCloseOther">{{i18nContext('closeOthers')}}</li>
  </ul>
</template>

<script setup>
import { i18nContext } from "@/utils/i18n";
import { useRouter } from "vue-router";
import useAppStore from "@/store/modules/useAppStore";

const props = defineProps({
  index:{
    type:Number,
    required:false
  }
})

const router = useRouter()
const appStore = useAppStore()

const handleRefresh = () =>{
  router.go(0)
}
const handleCloseRight= ()=>{
  appStore.removeTagsView({
    type:'right',
    index: props.index
  })
}
const handleCloseOther = ()=>{
  appStore.removeTagsView({
    type: 'other',
    index: props.index
  })
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
