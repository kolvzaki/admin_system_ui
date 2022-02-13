<script setup lang="ts">
  import {ref} from 'vue'
  import useAppStore from "@/store/modules/useAppStore";
  import useUserStore from "@/store/modules/useUserStore";
  import {storeToRefs} from "pinia";

  import Hamburger from "@/components/hamburger.vue";
  import SvgIcon from "@/components/common/SvgIcon.vue";
  import Breadcrumb from "@/components/Breadcrumb.vue";
  import LangSelect from "@/components/langSelect.vue";
  import ScreenFull from "@/components/screenFull.vue";
  import HeaderSearch from "@/components/headerSearch.vue";
  import ThemeSelect from "@/components/themeSelect.vue";

  import {ElMessage as message} from "element-plus";
  import {i18nNavBar,i18nAvatarFunction} from "@/utils/i18n";
  import {logout} from "@/api"
  import router from "@/router";

  const appStore = useAppStore()
  const userStore = useUserStore()
  const refStore = storeToRefs(appStore)

  const toggleClick = ()=>{
    appStore.changeCollapse()
  }
  const toggleSetting=()=>{
    appStore.changeShow()
  }
  const handleCommand = async (command:string|number|object) =>{
    switch (command) {
      case 'logout':{
        userStore.clearInfo()
        await appStore.clearInfo()
        await logout().then(res => {
          message.success("登出成功")
          router.push('/login')
        }).catch(err=>{
          router.push('/login')
        })
        break;
      }
    }
  }

  const squareUrl = ref( 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',)

</script>

<template>
<div class="navbar">
  <hamburger :isActive="refStore.isCollapse?.value"  @click="toggleClick"></hamburger>

  <breadcrumb class="breadcrumb-container"></breadcrumb>


  <div class="setting-container">

    <el-tooltip :content="i18nNavBar('headerSearch')">
      <header-search class="setting-content"></header-search>
    </el-tooltip>

    <el-tooltip :content="i18nNavBar('langSelect')" >
      <lang-select class="setting-content"> </lang-select>
    </el-tooltip>

    <el-tooltip :content="i18nNavBar('screenFull')">
      <screen-full class="setting-content"/>
    </el-tooltip>

    <el-tooltip :content="i18nNavBar('skinSetting')">
      <theme-select class="setting-content"></theme-select>
    </el-tooltip>

  </div>

  <div class="right-menu">
    <div class="avatar-function">
      <el-dropdown @command="handleCommand">
        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item command="logout">{{i18nAvatarFunction('logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="theme-settings" @click="toggleSetting">
      <svg-icon icon="eos-icons:rotating-gear"></svg-icon>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.navbar{
  @apply w-full h-full flex items-center justify-between;
  .right-menu{
    @apply h-full w-max flex items-center justify-center;
    .avatar-function{
      @apply px-4 py-2;
    }
    .theme-settings{
      @apply cursor-pointer;
      &:hover{
        animation: heartBeat 1s;
      }
    }
  }
  .breadcrumb-container{
    @apply  w-full ;
  }
  .setting-container{
    @apply flex items-center h-max w-max;

    .setting-content{
      @apply mr-5 w-max inline-block;
      ::v-deep(.el-icon){
        width: 32px;
        height: 32px;
      }
      &:hover{
        animation: pulse .5s;
      }
    }

  }
}

</style>
