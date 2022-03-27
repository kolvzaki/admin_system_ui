<template>
  <div class="container">
    <el-form v-model="data" label-width="150px">
      <el-form-item :label="i18nGroundQuery('id')">
        <el-input v-model="data.id" disabled />
      </el-form-item>
      <el-form-item :label="i18nGroundQuery('name')">
        <el-input v-model="data.name" />
      </el-form-item>

      <el-form-item :label="i18nGroundQuery('type')">
        <el-select
          v-model:model-value="data.type"
        >
          <el-option v-for="opt in queryOption.type" :label="opt.label" :value="opt.value" />
        </el-select>
      </el-form-item>

      <el-form-item :label="i18nGroundQuery('pics')">
        <el-image fit="contain" class="pics-contain" :src="data.pics">
          <template #error>
            <svg-icon icon="icon-park:pic-one" class-name="pics-icon"></svg-icon>
          </template>
        </el-image>
      </el-form-item>

      <el-form-item :label="i18nGroundQuery('cost')">
        <el-input-number v-model="data.cost" :min="0" :precision="1" />
      </el-form-item>

      <el-form-item :label="i18nGroundQuery('isAvailable')">
        <el-switch
          active-color="#13ce66" inactive-color="#ff4949"
          :active-value="1" :inactive-value="0"
          v-model="data.isAvailable">
        </el-switch>
      </el-form-item>


    </el-form>

    <div class="button-contain">
      <el-button type="primary" :size="componentSize" @click="update(data)">
        {{ SysI18n("button.confirm") }}
      </el-button>
      <el-button :size="componentSize" @click="cancelUpdate">
        {{ SysI18n("button.cancel") }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IGround } from "@/views/System/Playground/types/types";
import globalHooks from "@/utils/globalHooks";
import { i18nGroundQuery, SysI18n, i18nDeleteStatus } from "@/utils/i18n";
import { onMounted, reactive } from "vue";
import useGround from "@/views/System/Playground/hooks/useGround";

const { componentSize } = globalHooks();
const { queryOption, getGroundTypeOptions,updateGround } = useGround();

const props = withDefaults(defineProps<{
  p: IGround
}>(), {
  p: () => {
    return {
      id: "",
      name: "",
      type: "",
      pics: "",
      status: 0,
      isAvailable: 1,
      isDeleted: 0
    };
  }
});

onMounted(async () => {
  await getGroundTypeOptions();
});
//不能改变原数据
const data = reactive(JSON.parse(JSON.stringify(props.p)));
const update = async(data: IGround) => {
  await updateGround(data)
  cancelUpdate()
};
const emit = defineEmits(
  ["cancel"]
);

const cancelUpdate = () => {
  emit("cancel");
};

</script>

<style scoped lang="scss">

.container {
  @apply w-full h-full pr-10;
  .button-contain {
    @apply w-max h-max;
    margin: 0 auto;
  }

  .pics-contain {
    @apply flex items-center justify-center rounded border-2 border-gray-300 border-solid cursor-pointer;
    width: 200px;
    height: 200px;

    &:hover {
      animation: pulse .5s;
    }
  }
}

</style>
