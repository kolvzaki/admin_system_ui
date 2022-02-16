<template>
  <div v-if="isExternal"
       :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className"
  >
  </div>
  <el-icon  v-else>
    <Icon :icon="props.icon" :class="props.className" aria-hidden="true">
    </Icon>
  </el-icon>
<!--
  <span class="iconify" :data-icon="icon"></span>
-->
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";
import {isExternal as external} from "@/utils/validate";
import { Icon } from '@iconify/vue';
const props = defineProps<{
  icon:string,
  className?:string
}>()

const isExternal = computed(()=>external(props.icon))

const styleExternalIcon = computed(()=>({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

const iconName = computed(()=> `#icon-${props.icon}`)

</script>

<style scoped lang="scss">
.el-icon{
  @apply w-auto h-auto;
}
.svg-icon{
  @apply fill-current overflow-hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
}
.svg-external-icon{
  @apply inline-block bg-current;
  mask-size: cover !important;
}
.sidebar-icon{
  @apply w-5 h-5;
}

.pics-icon{
  @apply w-24 h-24;
}

.button-icon{
  @apply relative ml-1 left-1;
  width: 12px;
  height: 12px;
}

.data-icon{
  width: 64px;
  height: 64px;
}

.title-icon{
  width: 18px;
  height: 18px;
}

.navbar-icon{
  @apply inline-block;
  width: 32px;
  height: 32px;
}
.tags-icon{
  @apply inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-bottom: 3px;
  text-align: center;
  transition: .3s all ease-in-out;
  transform-origin: 100% 50%;
  &:before{
    transform: scale(.5);
    display: inline-block;
    vertical-align: -3px;
  }
  &:hover{
    animation: pulse .25s;
    color: #fff;
  }
}
</style>
