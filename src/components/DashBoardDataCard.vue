<template>
  <div class="data-contain hvr-float-shadow " :style="{
      background: props.bg
    }">
    <svg-icon :icon="props.icon" class-name="data-icon" class="icon-contain" ></svg-icon>
    <div class="data-display">
      <span class="data-context">
      {{ props.title }}
      </span>
      <span class="data-context">
      {{ props.data }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";

const props = defineProps<{
  name?: string,
  data: object | number,
  icon?: string,
  title?: string,
  bg?: string
}>();



</script>

<style scoped lang="scss">
.data-contain {
  @apply h-auto cursor-pointer py-2 flex justify-around items-center;
  transition: all ease-in-out .3s;
  width: 250px;
  border: 1px solid #2d3a4b;
  border-radius: 10px;

  .icon-contain {
    @apply p-2;
    border-radius: 10px;
    transition: all ease-in-out .3s;
  }

  &:hover {
    .icon-contain {
      background: rgba(255,255,255,.2);
      color: #fff;
    }
  }

  .data-display {
    @apply flex flex-col h-max items-center justify-around;
    width: 100px;

    .data-context {
      @apply inline-block py-1 text-base font-medium;
      color: #eee;
    }
  }
}

</style>
