<template>
  <div class="form-contain">
    <el-form v-model="data" class="form-input" label-width="120px" label-position="right">

      <el-form-item prop="id" :label="i18nUserQuery('id')">
        <span class="span-contain">{{data.id}}</span>
      </el-form-item>

      <el-form-item prop="username" :label="i18nUserQuery('username')">
        <span class="span-contain">{{data.username}}</span>
      </el-form-item>

      <el-form-item prop="nickname" :label="i18nUserQuery('nickname')">
        <el-input v-model="data.nickname"></el-input>
      </el-form-item>

      <el-form-item prop="email" :label="i18nUserQuery('email')">
        <el-input v-model="data.email"></el-input>
      </el-form-item>

      <el-form-item prop="mobile" :label="i18nUserQuery('mobile')">
        <el-input v-model="data.mobile"></el-input>
      </el-form-item>

      <el-form-item prop="avatar" :label="i18nUserQuery('avatar')">
        <el-image fit="contain" class="avatar-contain" :src="data.avatar">
          <template #error>
            <svg-icon icon="icon-park:pic-one" class-name="pics-icon"></svg-icon>
          </template>
        </el-image>
      </el-form-item>

      <el-form-item prop="isAvailable" :label="i18nUserQuery('isAvailable')">
        <el-select v-model="data.isAvailable">
          <el-option v-for="opt in queryOptions.isAvailable" :value="opt.value" :label="opt.label"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item  :label="i18nUserQuery('role')">
        <el-select v-model="data.role_name" @change="changeRid">
          <el-option v-for="opt in queryOptions.role" :value="opt.value" :label="opt.label"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="button-contain">
      <el-button type="primary" @click="update(data)">
        {{ SysI18n("button.confirm") }}
      </el-button>
      <el-button @click="cancelUpdate">
        {{ SysI18n("button.cancel") }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useModel from "./hooks/useModel";
import { i18nUserQuery, SysI18n } from "@/utils/i18n";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { reactive, ref} from "vue";
import { UpdateUser } from "@/api/user";
import { ElMessage as message } from "element-plus";
import { IUser } from "@/views/System/User/types/types";
import globalHooks from "@/utils/globalHooks";

const componentSize = ref("mini");

const props = defineProps<{
  p: IUser
}>();

const data = reactive(JSON.parse(JSON.stringify(props.p)))

const inputList = ["username", "email", "mobile"];
const isInput = (o: string) => {
  return inputList.indexOf(o) !== -1;
};
const optionsList = ["isAvailable", "gender", "isDeleted",'role'];
const isQueryOptions = (o: string) => {
  return optionsList.indexOf(o) !== -1;
};

const { unEditable,queryOptions } = useModel();

const changeRid = (val:string) => {
  queryOptions.role.forEach((value:any)=>{
    if(val===value.label){
      data.rid = value.id
      return;
    }
  })
}

const emit = defineEmits(
  ["cancel"]
);

const cancelUpdate = () => {
  emit("cancel");
};

const update = (data: IUser) => {
  UpdateUser(data).then(res => {
    message.success("Update Success");
    console.log(data);
  });
  cancelUpdate()
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

    .span-contain {
      @apply inline-block text-lg font-bold w-max h-max px-1 cursor-default transition-all;
      &:hover {
        animation: swing .5s;
      }
    }
  }

  .button-contain {
    @apply w-max h-max;
    margin: 0 auto;
  }
}

</style>
