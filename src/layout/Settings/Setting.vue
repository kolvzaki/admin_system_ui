<script lang="ts" setup>
import {ref} from "vue";
import useAppStore from "@/store/modules/useAppStore";
import {storeToRefs} from "pinia";
import {i18nSetting} from "@/utils/i18n";


const direction = ref('rtl')
const appStore = useAppStore()



</script>

<template>
<div class="setting-container">
  <el-drawer
    :title="i18nSetting('title')"
    :direction="direction"
    size="20%"
    v-model="appStore.getShowSettings"
    @closed="appStore.changeShow"
  >

  </el-drawer>
</div>
</template>

<style scoped lang="scss">


</style>
