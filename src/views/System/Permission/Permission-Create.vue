<template>
  <div class="container">
    <el-form v-model="model">
      <el-form-item v-for="o in Object.keys(model)" label-width="100px" :label="i18nPermissionQuery(o)">
        <el-input v-if="o !== 'id'" v-model="model[o]"></el-input>
        <el-input v-else disabled ></el-input>
      </el-form-item>
    </el-form>
    <div class="button-contain">
      <el-button type="primary" :size="componentSize" @click="permissionCreate(model)">
        {{SysI18n('button.confirm')}}
      </el-button>
      <el-button :size="componentSize" @click="cancelCreate" >
        {{SysI18n('button.cancel')}}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import globalHooks from "@/utils/globalHooks";
import usePermission from "@/views/System/Permission/hooks/usePermission";
import {i18nPermissionQuery,SysI18n} from "@/utils/i18n";
const {model,permissionCreate} = usePermission()
const {componentSize} = globalHooks()

const emit = defineEmits(
  ['cancel']
)

const cancelCreate = () =>{
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
