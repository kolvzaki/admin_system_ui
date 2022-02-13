<template>
  <div class="search-container" :class="{show: isShow}" >
    <svg-icon class="cursor-pointer"  icon="flat-color-icons:search" class-name="navbar-icon" @click.stop="showInput"></svg-icon>
    <el-select ref="headerSearchSelectRef" class="header-search-select"
       filterable default-first-option remote :remote-method="querySearch"
       placeholder="search" @change="handleChange" v-model="search" size="mini">
      <el-option v-for="option in searchOptions" :key="option.item.path" :label="option.item.title.join('-->')" :value="option.item">

      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">

import SvgIcon from "@/components/common/SvgIcon.vue";
import { computed, ref, watch} from "vue";
import {FuseRoutes,filterRoutes} from '@/router/handleRoutes';
import { useRouter } from "vue-router";
import Fuse from "fuse.js";
import { IFuseData } from "@/router/types";
import FuseResult = Fuse.FuseResult;
import { watchSwitchLang } from "@/utils/i18n";


const search = ref('');
const router = useRouter()
let fuseData = computed(()=>{
  let fRoutes = filterRoutes(router.getRoutes());
  return FuseRoutes(fRoutes)
})
//tips: fuseData是一个ref对象，new Fuse传进去.value才能查找数据
//@ts-ignore
let fuse: Fuse<IFuseData>
const initFuse =(fuseData:IFuseData[])=>{
  fuse = new Fuse(fuseData ,{
    shouldSort: true,
    minMatchCharLength: 2,
    //search weight
    keys:[
      {
        name:'title',
        weight: 0.6
      },
      {
        name: 'path',
        weight:0.4
      }
    ]
  })
}
initFuse(fuseData.value)

const showInput = () => {
  isShow.value = !isShow.value;
};

const querySearch = (query:string)=>{
  //console.log(fuse.search(query));
  if (query !== ''){
     searchOptions.value = fuse.search(query)
  }else{
    searchOptions.value = []
  }
};

const searchOptions=  ref<FuseResult<IFuseData>[]>([]);

//选中回调
const handleChange= (val:any)=>{
  router.push(val.path)
  search.value = ''
}
const isShow = ref(false);
watch(isShow,val=>{
  if (val){
    //@ts-ignore
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click',onClose)
  }else{
    document.body.removeEventListener('click',onClose)
  }
})

const headerSearchSelectRef = ref(null);
const onClose = ()=>{
  //@ts-ignore
  //headerSearchSelectRef.value
  isShow.value = false
  searchOptions.value = []
}

watchSwitchLang(()=>{
  fuseData = computed(()=>{
    let fRoutes = filterRoutes(router.getRoutes());
    return FuseRoutes(fRoutes)
  })
  initFuse(fuseData.value)
} )

</script>

<style scoped lang="scss">
.search-container {
  @apply w-auto h-auto;
  .header-search-select{
    @apply inline-block bg-transparent ;
    transition: width .3s;
    width:0;
    ::v-deep(.el-input__inner){
      border-radius: 0;
      border: 0;
      padding: 0;
      box-shadow: none !important;
      background: none;
      border-bottom: 1px solid #000000;
      position: relative;

    }
  }
  &.show{
    .header-search-select{
      @apply ml-2;
      width: 200px;
    }
  }
}



</style>
