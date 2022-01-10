<template>
  <el-dropdown trigger="click" @command="changeLang" placement="bottom">
    <svg-icon icon="ion:language" class-name="navbar-icon"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="'zh'===lang" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled=" lang==='en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import {computed} from "vue";
import useAppStore from "@/store/modules/useAppStore";
import {useI18n} from "vue-i18n";
import {ElMessage} from "element-plus";

const store = useAppStore()
const lang = computed(()=> store.getAppLanguage)
const i18n = useI18n()

const changeLang = (lang:string):void=>{
  i18n.locale.value = lang
  store.setLang(lang)
  ElMessage.success('Update Successfully!')
}

</script>

<style scoped lang="scss">

</style>
