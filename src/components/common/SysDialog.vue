<template>
  <div>
    <el-dialog :title="props.title" :model-value="props.isShow"
               @closed="cancelDialog" :append-to-body="false" width="40%"
               :close-on-click-modal="false">
      <template #default>
        <component :is="props.view" :p="props.p" @cancel="cancelDialog"></component>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>

const emit = defineEmits(["cancelDialog"]);
const cancelDialog = () => {
  if (props.isShow){
    emit("cancelDialog");
  }
};

const props = defineProps(
  {
    isShow: {
      type: Boolean,
      required: true,
      default: () => false
    },
    title: {
      type: String,
      required: false,
      default: () => "Card"
    },
    p: {
      type: Object,
      required: false,
      default: () => {
      }
    },
    view: {
      type: Object,
      required: false,
      default: () => import("@/views/System/Index.vue")
    }
  }
);

</script>

<style scoped lang="scss">
.view-contain {
  @apply w-max h-max;
}


</style>
