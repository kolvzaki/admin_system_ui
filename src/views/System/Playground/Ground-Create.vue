<template>
  <div class="container">
    <el-form v-model="GroundModel">
      <el-form-item v-for="o in Object.keys(GroundModel)" label-width="100px" :label="i18nGroundQuery(o)">
        <el-input v-if="o === 'id'" disabled></el-input>
        <el-tag v-else-if="o === 'isDeleted'" type="danger">
          {{ i18nDeleteStatus("deleted") }}
        </el-tag>
        <el-switch v-else-if="o === 'isAvailable'"
                   active-color="#13ce66" inactive-color="#ff4949"
                   :active-value="1" :inactive-value="0"
                   v-model="GroundModel.isAvailable">
        </el-switch>
        <el-input v-else v-model="GroundModel[o]"></el-input>
      </el-form-item>
    </el-form>

    <div class="button-contain">
      <el-button type="primary" :size="componentSize" @click="create(GroundModel)">
        {{SysI18n('button.confirm')}}
      </el-button>
      <el-button :size="componentSize" @click="cancelCreate" >
        {{SysI18n('button.cancel')}}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useGround from "@/views/System/Playground/hooks/useGround";
import globalHooks from "@/utils/globalHooks";
import { i18nGroundQuery,SysI18n,i18nDeleteStatus } from "@/utils/i18n";
import { IGround } from "@/views/System/Playground/types/types";

const {componentSize} = globalHooks()
const {GroundModel,createGround} = useGround()

const create = (data:IGround) => {
  createGround(data)
  cancelCreate()
}

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
