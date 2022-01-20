<template>
  <div class="tags-view-container">
    <router-link v-for="(tag,index) in appStore.getAppTags"
                 :key="tag.fullPath"  class="tags-view-item"
                 :class="isActive(tag)?'active':''"
                  :to="{path:tag.fullPath}"
                 :style="{
                   background: isActive(tag)?'var(--el-tags-active-color)':'',
                 }"
                 @contextmenu.prevent="openMenu($event,index)"

    >
      {{tag.title}}
      <svg-icon v-show="!isActive(tag)" icon="emojione-v1:cross-mark" class-name="tags-icon" @click.prevent.stop="onCloseClick(index)"> </svg-icon>
    </router-link>
  </div>
  <context-menu v-show="menuVisible"></context-menu>
</template>

<script setup>

import useAppStore from "../../store/modules/useAppStore";
import { useRoute } from "vue-router";
import SvgIcon from "./SvgIcon.vue";
import { ref } from "vue";
import ContextMenu from "@/components/common/ContextMenu.vue";

const route = useRoute()
const appStore = useAppStore()
const isActive = (tag) =>{
  return tag.path === route.path
}
const onCloseClick = (index) =>{

}
const menuVisible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})

const openMenu = (e,index)=>{
  menuVisible.value = !menuVisible.value
  const{x,y} = e

}

</script>

<style scoped lang="scss">
.tags-view-container{

  .tags-view-item{
    @apply inline-block relative cursor-pointer h-full px-2 text-base;
    margin-left: 5px;
    border: 1px solid #2d3a4b;
    padding: 0 10px;
    color: var(--el-tags-font-color);
    background: var(--el-tags-item-background-color);

    &:first-of-type{
      margin-left: 10px;
    }
    &:last-of-type{
      margin-right: 10px;
    }
    &.active{
      color: var(--el-tags-active-font-color);
      &::before{
        content: '';
        background: var(--el-tags-active-color);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
      }
    }
  }
}

</style>
