<script setup lang="ts">
  interface Props{
    isActive: boolean
  }
  const props = withDefaults(defineProps<Props>(),{
    isActive: false,
    default:()=> false
  })

</script>

<template>
  <div :class="['hamburger',isActive ? 'isActive': '']" >
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  role="img"
         width="36" height="36" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
      <path fill="currentColor" d="M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384L128 512l192 128V384z"/>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.hamburger{
  @apply cursor-pointer p-2 transition-all duration-700;

  &:hover{
    background: #fff;
  }
}
.isActive{
  transform: rotateY(180deg);
}

</style>
