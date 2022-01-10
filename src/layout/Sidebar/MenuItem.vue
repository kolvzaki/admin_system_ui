<script lang="ts" setup>
import {defineProps} from "vue";
import {IMenuItem} from "@/interfaces/modules/menu";
import SvgIcon from "@/components/common/SvgIcon.vue";
import {i18nTitle} from "@/utils/i18n";

const props = defineProps<{
  route?: IMenuItem,
  key?:string
}>()

</script>
<template>
  <el-sub-menu v-if="props.route.children && props.route.children.length > 0 " :index="props.route.path">
    <template #title>
      <el-icon v-if="!props.route.meta.icon.includes(':')">
        <component :is="props.route.meta.icon"></component>
      </el-icon>
      <svg-icon v-else :icon="props.route.meta.icon" class-name="sidebar-icon" ></svg-icon>
<!--      <span>{{props.route.meta.title}}</span>-->
      <span>{{ i18nTitle(props.route.meta.title) }}</span>
    </template>
    <menu-item v-for="item in props.route.children" :key="item.path" :route="item"></menu-item>

  </el-sub-menu>
  <el-menu-item v-else :index="props.route.path">
    <el-icon  v-if="!props.route.meta.icon.includes(':')">
      <component :is="props.route.meta.icon"></component>
    </el-icon>
    <svg-icon v-else :icon="props.route.meta.icon" class-name="sidebar-icon"></svg-icon>
<!--    <span>{{props.route.meta.title}}</span>-->
    <span>{{ i18nTitle(props.route.meta.title) }}</span>
  </el-menu-item>
</template>

<style scoped lang="scss">

</style>
