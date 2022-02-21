<template>
  <div class="container">
    <el-form v-model="data">
      <el-form-item v-for="o in Object.keys(data)" label-width="100px" :label="i18nRoleQuery(o)">
        <el-input v-if="o !== 'id'" v-model="data[o]"></el-input>
        <el-input v-else disabled v-model="data[o]"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-contain">
      <el-button type="primary" :size="componentSize" @click="update(data)">
        {{SysI18n('button.confirm')}}
      </el-button>
      <el-button :size="componentSize" @click="cancelUpdate" >
        {{SysI18n('button.cancel')}}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoleHooks from "./hooks/useRole";
import {i18nRoleQuery,SysI18n} from "@/utils/i18n";
import { reactive, ref } from "vue";
import { IRole } from "@/views/System/Role/types/types";
import {updateRole} from "@/api/role"
import { ElMessage as message } from "element-plus";

const props = withDefaults(defineProps<{
  p:IRole
}>(),{
  p:()=>{
    return {
      id:0,
      name:'',
      remark:''
    }
  }
})
const componentSize = ref('mini')

const data = reactive(JSON.parse(JSON.stringify(props.p)))

const update = (data:IRole) =>{
  updateRole(data).then(res=>{
    message.success('Update Success!')
  }).catch(err=>{
    console.log(err);
  })
  cancelUpdate()
}

const emit = defineEmits(
  ['cancel']
)

const cancelUpdate = ()=>{
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
