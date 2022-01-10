<script lang="ts" setup>
import {computed, ref} from 'vue'
import useAppStore from "@/store/modules/useAppStore";
import MenuItem from "@/layout/Sidebar/MenuItem.vue";
import {useRoute, useRouter} from "vue-router";

import {filterRoutes as fRoutes, MenuHandle} from "@/router/handleRoutes";
import {i18nTitle} from "@/utils/i18n";

const router = useRouter()
const appStore = useAppStore()
const pics = ref('https://gitee.com/kolvzaki/pics/raw/master/img/logo.png')
const routes = computed(()=>{
  const filterRoutes = fRoutes(router.getRoutes())
  return (MenuHandle(filterRoutes))
})

const appRoute = useRoute()
const activeRoute = computed(()=>{
  const {path} = appRoute
  return path
})
const size = ref(10)

</script>

<template>

  <div class="sidebar-logo-contain">
    <el-space :size="size">
      <div class="logo-contain">
        <el-image :src="pics" fit="cover" ></el-image >
      </div>
      <transition name="titleAnime">
        <div v-show="!appStore.isCollapse" class="title-contain">
          <span  class="logo-title" >{{ i18nTitle('sideBarTitle') }}</span>
        </div>
      </transition>
    </el-space>
  </div>
  <el-scrollbar>
    <el-menu
      :default-active="activeRoute"
      class="sidemenu"

      :active-text-color="appStore.getMenuActive"
      :collapse="appStore.isCollapse"
      router
      unique-opened
    >

      <menu-item v-for="item in routes" :route="item" :key="item.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
@import "src/assets/style/sidebar.scss";

</style>
