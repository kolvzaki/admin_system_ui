<script setup >
import {watch,ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {i18nTitle} from "@/utils/i18n";
const router = useRouter()
const routes = useRoute()
const breadcrumbData = ref([])
const getBreadcrumbData = () =>{
  breadcrumbData.value = routes.matched.filter(item => item.meta && item.meta.title)
}

const toggleBreadcrumb  = (item)=>{
  router.push(item.path)
}

watch(routes,()=>{
  getBreadcrumbData()
},{
  immediate:true
})

</script>

<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadcrumbAnime">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="item.path">
      <span class="no-direct" v-if="index === breadcrumbData.length-1">
        {{i18nTitle(item.meta.title)}}
      </span>
        <span v-else class="can-direct" @click="toggleBreadcrumb(item)">
        {{i18nTitle(item.meta.title)}}
      </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>


<style scoped lang="scss">
.breadcrumb{
  @apply inline-block ml-3 text-base;
  .no-direct{
    @apply cursor-default;
    color: var(--el-breadcrumb-text-color);
  }
  .can-direct{
    @apply cursor-pointer transition-all;
    &:hover{
      color: var(--el-breadcrumb-hover-text-color)
    }
  }
}

.breadcrumbAnime-enter-active{
  transition: all .5s;
  animation: zoomIn .5s;
}
.breadcrumbAnime-leave-active{
  @apply absolute;
  transition: all .5s;
  animation: rollOut .5s;
}







</style>
