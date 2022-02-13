<template>
  <el-dropdown @command="handleCommand" trigger="click">
    <svg-icon icon="icon-park:theme" class-name="navbar-icon"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="default" :disabled="isDark === false">
          {{ i18nSkin("default") }}
        </el-dropdown-item>
        <el-dropdown-item command="dark" :disabled="isDark === true">
          {{ i18nSkin("dark") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import SvgIcon from "./common/SvgIcon.vue";
import { useDark, useToggle } from "@vueuse/core";

import { ref, watch } from "vue";
import { i18nSkin } from "@/utils/i18n";

let isDark = ref(false);

const dark = useDark()

const handleCommand = (command) => {
  isDark.value = !isDark.value;
  useToggle(dark)
};

</script>

<style scoped>

</style>
