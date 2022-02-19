<template>
  <div class="container">
    <el-form v-model="data">
      <el-form-item v-for="o in Object.keys(data)" label-width="100px" :label="i18nPermissionQuery(o)">
        <el-input v-if="o !== 'id'" v-model="data[o]"></el-input>
        <el-input v-else disabled v-model="data[o]"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-contain">
      <el-button type="primary" :size="componentSize" @click="permissionUpdate(data)">
        {{SysI18n('button.confirm')}}
      </el-button>
      <el-button :size="componentSize" @click="cancelUpdate" >
        {{SysI18n('button.cancel')}}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import globalHooks from "@/utils/globalHooks";
import usePermission from "@/views/System/Permission/hooks/usePermission";
import { IPermission } from "@/views/System/Permission/types/types";
import {i18nPermissionQuery,SysI18n} from "@/utils/i18n"
import { reactive } from "vue";

const {componentSize} = globalHooks()
const {permissionUpdate} = usePermission()

const props = withDefaults(defineProps<{
  p:IPermission
}>(),{
  p:()=>{
    return {
      id:'',
      name:'',
      remark:''
    }
  }
})

const data = reactive(JSON.parse(JSON.stringify(props.p)))

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
