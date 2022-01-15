<template>
  <div class="screen-container" @click="changeScreen">
    <svg-icon :icon="icon" class-name="navbar-icon"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import useAppStore from "@/store/modules/useAppStore";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import screenfull from "screenfull";
import { ElMessage } from "element-plus";

const appStore = useAppStore()
let refStore = storeToRefs(appStore)

const icon = computed(()=>{
  return refStore.getScreenFull.value? 'icon-park:off-screen-one':'icon-park:full-screen-one';
})

const changeScreen = ():void =>{
  screenfull.toggle().then(res => (
    console.log('Screen change')
  )).catch(err=>{
    console.log(err);
  })
}

const change = () =>{
  appStore.setScreenFull(screenfull.isFullscreen)
}

onMounted(()=>{
  screenfull.on('change',change) //添加监视器
})

onUnmounted(()=>{
  screenfull.off('change',change) //卸载监视器
})

</script>

<style scoped lang="scss">
.screen-container{
  @apply cursor-pointer;

}
</style>
