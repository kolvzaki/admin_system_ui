  <template>
  <div class="tags-view-container">
    <router-link v-for="(tag,index) in appStore.getAppTags"
                 :key="tag.fullPath"  class="tags-view-item"
                 :class="isActive(tag)?'active':''"
                  :to="{path:tag.fullPath}"
                 :style="{
                   background: isActive(tag)?'#333366':'',
                 }"
                 @contextmenu.prevent="openMenu($event,index)"

    >
      {{tag.title}}
      <svg-icon v-show="!isActive(tag)" icon="emojione-v1:cross-mark" class-name="tags-icon" @click.prevent.stop="onCloseClick(index)"> </svg-icon>
    </router-link>
    <context-menu v-show="menuVisible" :style="menuStyle" :index="selectIndex"></context-menu>
  </div>

</template>

<script setup>

import useAppStore from "../../store/modules/useAppStore";
import { useRoute } from "vue-router";
import SvgIcon from "./SvgIcon.vue";
import { ref, watch } from "vue";
import ContextMenu from "@/components/common/ContextMenu.vue";

const route = useRoute()
const appStore = useAppStore()
const isActive = (tag) =>{
  return tag.path === route.path
}
const onCloseClick = (index) =>{
  appStore.removeTagsView({
    type:'index',
    index
  })
}
const menuVisible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})
const selectIndex = ref(0)
const openMenu = (e,index)=>{
  const {x,y} = e
  menuVisible.value = true
  menuStyle.value.left = x +'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
}

const closeMenu = ()=>{
  menuVisible.value = false
}

watch(menuVisible,val=>{
  if (val){
    document.body.addEventListener('click',closeMenu)
  }else{
    document.body.removeEventListener('click',closeMenu)
  }
})

</script>

<style scoped lang="scss">
.tags-view-container{

  .tags-view-item{
    @apply inline-block relative cursor-pointer h-full px-2 text-base;
    margin-left: 5px;
    border: 1px solid #2d3a4b;
    padding: 0 10px;
    letter-spacing: .05em;

    &:first-of-type{
      margin-left: 10px;
    }
    &:last-of-type{
      margin-right: 10px;
    }
    &.active{
      color: #fff;
      font-weight: bold;
      &::before{
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
      }
    }
  }
}

</style>
