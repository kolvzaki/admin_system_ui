<template>
    <div class="form-contain">
      <el-form v-model="p" class="form-input" label-width="120px" label-position="right">
        <el-form-item v-for="o in Object.keys(p)" :prop="o" >
          <template #label v-if="unEditable.indexOf(o) ===-1">
            <span class="form-title">{{i18nUserQuery(o)}}</span>
          </template>
          <template #default v-if="unEditable.indexOf(o) ===-1">
            <el-input v-model="p[o]" v-if="o !=='avatar' && o !== 'username'"></el-input>
            <span v-else-if="o ==='username'" class="username-contain">
            {{p[o]}}
          </span>
            <el-image fit="contain" v-else class="avatar-contain" :src="p.avatar">
              <template #error>
                <svg-icon icon="icon-park:pic-one" class-name="pics-icon"></svg-icon>
              </template>
            </el-image>
          </template>
        </el-form-item>
      </el-form>
      <div class="button-contain">
        <el-button type="primary"  @click="update(p)">
          {{SysI18n('button.confirm')}}
        </el-button>
        <el-button @click="cancelCreate" >
          {{SysI18n('button.cancel')}}
        </el-button>
      </div>
    </div>
</template>

<script setup lang="ts">
import useModel from "./hooks/useModel";
import {i18nUserQuery,SysI18n} from "@/utils/i18n";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { ref, toRefs } from "vue";
import { UpdateUser } from "@/api/user";
import { ElMessage as message } from "element-plus";
import { IUser } from "@/views/System/User/types/types";

const componentSize = ref('mini')

const props = defineProps<{
  p:IUser
}>()

const {unEditable} = useModel()

const emit = defineEmits(
  ['cancel']
)

const cancelCreate = ()=>{
  emit('cancel')
}

const update = (data:IUser) =>{
  UpdateUser(data).then(res=>{
    message.success('Update Success')
  })
}

</script>

<style scoped lang="scss">
.form-contain{
  @apply w-full h-full;
  .form-input{
    @apply w-full h-full;
    .form-title{
      @apply cursor-default text-base tracking-wide text-indigo-600;
    }
    .avatar-contain{
      @apply flex items-center justify-center rounded border-2 border-gray-300 border-solid cursor-pointer;
      width: 200px;
      height: 200px;
      &:hover{
        animation: pulse .5s;
      }
    }
    .username-contain{
      @apply inline-block text-lg font-bold w-max h-max px-1 cursor-default transition-all;
      &:hover{
        animation: swing .5s;
      }
    }
  }
  .button-contain{
    @apply w-max h-max relative bottom-10;
    margin: 0 auto;
  }
}

</style>
