<template>

  <el-dropdown trigger="click" @command="changeSkin" placement="bottom">
    <svg-icon icon="noto:t-shirt" class-name="navbar-icon"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in appStore.getAppThemes" :command="item">
          {{i18nSkin(item)}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>


</template>

<script lang="ts" setup>
import SvgIcon from "@/components/common/SvgIcon.vue";
import {i18nSkin} from "@/utils/i18n";
import useAppStore from "@/store/modules/useAppStore";
import {ElMessage} from "element-plus";
import {setTheme} from "@/themes";


const appStore = useAppStore()

const changeSkin = (v:string)=> {
  appStore.setTheme(v)
  //@ts-ignore
  setTheme(v)
  ElMessage.success('Theme has been changed!')
}

</script>

<style scoped>

</style>
