<template>
  <div class="tags-view-container">
    <router-link v-for="(tag,index) in appStore.getAppTags"
                 :key="tag.fullPath"  class="tags-view-item"
                 :class="isActive(tag)?'isAcitve':''"
                  :to="{path:tag.fullPath}"
    >
      {{tag.title}}
      <svg-icon v-show="!isActive(tag)" icon="emojione-v1:cross-mark"  @click.prevent.stop="onCloseClick(index)"> </svg-icon>
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

<style scoped>

</style>
