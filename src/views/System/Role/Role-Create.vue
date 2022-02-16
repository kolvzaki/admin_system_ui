<template>
  <div class="container">
    <el-form v-model="RoleModel">
      <el-form-item v-for="o in Object.keys(RoleModel)" label-width="100px" :label="i18nRoleQuery(o)">
        <el-input v-if="o !== 'id'" v-model="RoleModel[o]"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-contain">
      <el-button type="primary" :size="componentSize" @click="CreateRole(RoleModel)">
        {{SysI18n('button.confirm')}}
      </el-button>
      <el-button :size="componentSize" @click="cancelCreate" >
        {{SysI18n('button.cancel')}}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoleHooks from "./hooks/useRole";
import {i18nRoleQuery,SysI18n} from "@/utils/i18n";
import { ref } from "vue";

const componentSize = ref('mini')
const {RoleModel,CreateRole} = RoleHooks()

const emit = defineEmits(
  ['cancel']
)

const cancelCreate = ()=>{
  emit('cancel')
}

</script>

<style scoped lang="scss">

.container{
  @apply w-full h-full pr-10;
  .button-contain{
    @apply w-max h-max;
    margin: 0 auto;
  }
}

</style>
