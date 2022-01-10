<template>
  <router-view/>
</template>

<script lang="ts" setup>
import { setTheme,logTheme } from "@/themes";
import { onMounted } from "vue";
import { Local } from "@/utils/storage";

onMounted(()=>{
  logTheme()
  setTheme(Local.getItem('app-theme'))
})

</script>

<style scoped>

</style>
