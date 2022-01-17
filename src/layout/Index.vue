<script setup>
import Navbar from '@/layout/Navbar/Navbar.vue'
import Sidebar from '@/layout/Sidebar/Sidebar.vue'
import useAppStore from "@/store/modules/useAppStore";
import Setting from "@/layout/Settings/Setting.vue";
import AppTabs from "@/layout/Tabs/AppTabs.vue"

import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { isTags } from "@/utils/tags";
import { i18nTitle } from "@/utils/i18n";
import TagsView from "@/components/common/tagsView.vue";




const appStore = useAppStore()
const pics = ref('https://gitee.com/kolvzaki/pics/raw/master/img/logo.png')
const route = useRoute()

watch(route,(to,from)=>{
  if(!isTags(to.path)){
    return
  }
  const {fullPath,meta,name,params,path,query} = to
  appStore.setTags({
    fullPath,meta,name,params,path,query,title:getTitle(to)
  })

},{
  immediate:true
})

const getTitle = (route) =>{
  let title = ''
  if (!route.meta){
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1 ]
  }
  else{
    title = i18nTitle(route.meta.title)
  }

  return title
}


</script>

<template>
  <el-container class="app-container">
    <el-aside class="app-sidebar" :width="appStore.isCollapse?'60px':'220px'">
      <sidebar></sidebar>
    </el-aside>

    <el-container class="app-content">
      <el-header class="app-header">
        <navbar></navbar>
      </el-header>

      <app-tabs class="app-tags">

      </app-tabs>

      <el-main class="pageview">
        <router-view/>
      </el-main>
    </el-container>
    <el-container v-show="appStore.getShowSettings">
      <setting />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@import "../assets/style/_global.scss";
.app-container{
  @apply w-full h-full ;

  .app-sidebar{
    @apply h-full overflow-hidden;
    transition: all ease-in-out .3s;
  }

  .app-content{
    @apply w-full h-full;
    .app-header{
      @apply w-full h-14;
      background: var(--el-navbar-background-color);
    }
    .app-tags{
      @apply py-1 w-full h-max border border-solid;
      background: var(--el-tags-background-color);
      border-color: var(--el-border-color-base);
    }
    .pageview{
      background: var(--el-main-background-color);
    }
  }
}

</style>
