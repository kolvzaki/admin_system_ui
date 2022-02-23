<template>
  <div class="container">
    <el-form v-model="GroundModel">
      <el-form-item v-for="o in Object.keys(GroundModel)" label-width="100px" :label="i18nGroundQuery(o)">
        <el-input v-if="o === 'id'" disabled></el-input>
        <el-tag v-else-if="o === 'isDeleted'" type="danger">
          {{ i18nDeleteStatus("deleted") }}
        </el-tag>
        <el-tag v-else-if="o === 'status'" type="success">
          {{ i18nGroundStatus("free") }}
        </el-tag>
        <el-image v-else-if="o ==='pics'"  fit="contain" class="pics-contain" :src="GroundModel.pics">
          <template #error>
            <svg-icon icon="icon-park:pic-one" class-name="pics-icon"></svg-icon>
          </template>
        </el-image>
        <el-switch v-else-if="o === 'isAvailable'"
                   active-color="#13ce66" inactive-color="#ff4949"
                   :active-value="1" :inactive-value="0"
                   v-model="GroundModel.isAvailable">
        </el-switch>
        <el-input-number v-else-if="o==='cost'" v-model="GroundModel.cost" :min="0" :precision="1"/>
        <el-select
          v-else-if="o==='type'" v-model="GroundModel.type"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
        >
          <el-option v-for="opt in queryOption.type" :label="opt.label" :value="opt.value"></el-option>
        </el-select>
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
import { i18nGroundQuery,SysI18n,i18nDeleteStatus,i18nGroundStatus } from "@/utils/i18n";
import { IGround } from "@/views/System/Playground/types/types";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { onMounted } from "vue";


const {componentSize} = globalHooks()
const {GroundModel,createGround,queryOption,getGroundTypeOptions} = useGround()

onMounted(()=>{
  getGroundTypeOptions()
})

const create = async (data:IGround) => {
  await createGround(data)
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
