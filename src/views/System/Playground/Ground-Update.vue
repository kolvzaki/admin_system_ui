<template>
  <div class="container">
    <el-form v-model="data">
      <el-form-item v-for="o in Object.keys(data)" label-width="100px" :label="i18nGroundQuery(o)">
        <span v-if="o === 'id'">
          {{ data[o] }}
        </span>
        <el-tag v-else-if="o === 'isDeleted'" :type=" data.isDeleted === 1?'success':'danger' ">
          {{ i18nDeleteStatus(data.isDeleted === 1 ? "exists" : "deleted") }}
        </el-tag>
        <el-switch v-else-if="o === 'isAvailable'"
                   active-color="#13ce66" inactive-color="#ff4949"
                   :active-value="1" :inactive-value="0"
                   v-model="data.isAvailable">
        </el-switch>
        <el-input v-else v-model="data[o]"></el-input>
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
import { reactive } from "vue";

const { componentSize } = globalHooks();

const props = withDefaults(defineProps<{
  p: IGround
}>(), {
  p: () => {
    return {
      id: "",
      name: "",
      type: "",
      pics:"",
      status: 0,
      isAvailable: 1,
      isDeleted: 0
    };
  }
});
//不能改变原数据
const data = reactive(JSON.parse(JSON.stringify(props.p)))
const update = (data: IGround) => {

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
}

</style>
