<script setup lang="ts">
  import {ref} from 'vue'
  import Hamburger from "@/components/hamburger.vue";
  import useAppStore from "@/store/modules/useAppStore";
  import {storeToRefs} from "pinia";
  import SvgIcon from "@/components/common/SvgIcon.vue";
  import Breadcrumb from "@/components/Breadcrumb.vue";
  import LangSelect from "@/components/langSelect.vue";

  import {i18nNavBar} from "@/utils/i18n";
  import SkinSetting from "@/components/skinSetting.vue";

  const appStore = useAppStore()
  const refStore = storeToRefs(appStore)

  const toggleClick = ()=>{
    appStore.changeCollapse()
  }
  const toggleSetting=()=>{
    appStore.changeShow()
  }

  const squareUrl = ref( 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',)

</script>

<template>
<div class="navbar">
  <hamburger :isActive="refStore.isCollapse.value"  @click="toggleClick"></hamburger>

  <breadcrumb class="breadcrumb-container"></breadcrumb>


  <div class="setting-container">
    <el-tooltip :content="i18nNavBar('langSelect')" >
      <lang-select class="setting-content"> </lang-select>
    </el-tooltip>
    <el-tooltip :content="i18nNavBar('skinSetting')" >
      <skin-setting class="setting-content"></skin-setting>
    </el-tooltip>
  </div>

  <div class="right-menu">
    <div class="avatar-function">
      <el-dropdown>
        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
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
      @apply px-4 pt-2;
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
    @apply flex items-center  h-full;
    width: 300px;
    .setting-content{
      @apply ml-5;
      width: 32px;
      height: 32px;
    }
  }
}

</style>
