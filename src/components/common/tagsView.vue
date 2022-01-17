<template>
  <div class="tags-view-container">
    <router-link v-for="(tag,index) in appStore.getAppTags"
                 :key="tag.fullPath"  class="tags-view-item"
                 :class="isActive(tag)?'active':''"
                  :to="{path:tag.fullPath}"
    >
      {{tag.title}}
      <svg-icon v-show="!isActive(tag)" icon="emojione-v1:cross-mark" class-name="tags-icon" @click.prevent.stop="onCloseClick(index)"> </svg-icon>
    </router-link>
  </div>
</template>

<script setup>

import useAppStore from "../../store/modules/useAppStore";
import { useRoute } from "vue-router";
import SvgIcon from "./SvgIcon.vue";

const route = useRoute()
const appStore = useAppStore()
const isActive = (tag) =>{
  return tag.path === route.path
}
const onCloseClick = () =>{

}

</script>

<style scoped lang="scss">
.tags-view-container{
  @apply w-full h-full;
  .tags-view-item{
    @apply inline-block relative cursor-pointer h-full px-2 text-base;
    margin-left: 3px;
    border: 1px solid #2d3a4b;
    color: var(--el-tags-font-color);
    background: var(--el-tags-item-background-color);
  }
  &.active{
    color: var(--el-tags-active-color);
    &::before{
      content: '';
      background: var(--el-tags-item-background-color);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 5px;
    }
  }
}

</style>
