<template>
  <div class="form-contain">
    <el-form v-model="userModel" class="form-input" label-width="80px" label-position="right">
      <el-form-item v-for="o in Object.keys(userModel)" :prop="o">
        <template #label v-if="unEditable.indexOf(o) ===-1">
          <span class="form-title">{{ i18nUserQuery(o) }}</span>
        </template>
        <template #default v-if="unEditable.indexOf(o) ===-1">
          <el-input v-model="userModel[o]" v-if="o !=='avatar' && o !== 'role'"></el-input>
          <el-select v-model="userModel['role']" v-else-if="o === 'role'">
            <el-option v-for="opt in queryOptions.role" :value="opt.id" :label="opt.label"></el-option>
          </el-select>
          <el-image fit="contain" v-else class="avatar-contain" :src="userModel.avatar">
            <template #error>
              <svg-icon icon="icon-park:pic-one" class-name="pics-icon"></svg-icon>
            </template>
          </el-image>
        </template>
      </el-form-item>
    </el-form>
    <div class="button-contain">
      <el-button type="primary" @click="create(userModel)">
        {{ SysI18n("button.confirm") }}
      </el-button>
      <el-button @click="cancelCreate">
        {{ SysI18n("button.cancel") }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useModel from "./hooks/useModel";
import { i18nUserQuery, SysI18n } from "@/utils/i18n";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { ref } from "vue";
import { CreateUser } from "@/api/user";
import { ElMessage as message } from "element-plus";

const componentSize = ref("mini");

const { userModel, unEditable,queryOptions } = useModel();

const emit = defineEmits(
  ["cancel"]
);

const cancelCreate = () => {
  emit("cancel");
};

const create = (userModel: object) => {
  CreateUser(userModel).then(res => {
    message.success("添加成功");
    cancelCreate();
  })
    .catch(err => {
      console.log(err);
    });
};


</script>

<style scoped lang="scss">
.form-contain {
  @apply w-full h-full;
  .form-input {
    @apply w-full h-full;
    .form-title {
      @apply cursor-default text-base tracking-wide text-indigo-600;
    }

    .avatar-contain {
      @apply flex items-center justify-center rounded border-2 border-gray-300 border-solid cursor-pointer;
      width: 200px;
      height: 200px;

      &:hover {
        animation: pulse .5s;
      }
    }
  }

  .button-contain {
    @apply w-max h-max relative bottom-10;
    margin: 0 auto;
  }
}
</style>
