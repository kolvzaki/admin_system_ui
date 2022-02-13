<template>
  <el-scrollbar>
    <div class="dash-contain">
      <div class="card-contain">
        <dash-board-data-card
          v-for="item in cardItem"
          @click="changeChartsType(item.name)"
          :data="item.data" :icon="item.icon" :name="item.name" :title="item.title" :bg="item.bg">

        </dash-board-data-card>
      </div>

      <div class="chart-contain" id="app-charts" style="width: 100%; height: 400px;">

      </div>

      <div class="more-chart">
        <div id="pie-charts" style="width: 350px;height: 350px;background: aliceblue">

        </div>
        <div id="bar-charts" style="width: 350px;height: 350px;background: #67c23a">

        </div>
        <div id="dash-charts" style="width: 350px;height: 350px;background: #CC3399">

        </div>
      </div>

    </div>
  </el-scrollbar>
</template>

<script setup>
import DashBoardDataCard from "@/components/DashBoardDataCard.vue";
import useCharts from "./hooks/useCharts";
import { onMounted, ref } from "vue";
import { i18nCardItem, i18nChartTitle, watchSwitchLang } from "../../utils/i18n";
import userCardHooks from "./hooks/userCardHooks";

watchSwitchLang(() => {
  cardItem.value.forEach((item,index)=>{
    item.title = i18nCardItem(item.name)
  })
});

const cardItem = userCardHooks().cardItem

const userData = ref([1,3,5,7,9,11,13])
const groundData = ref([2,4,6,8,10,12,14])
const refDataType = ref("UserData")

const changeChartsType = (chartsType) =>{
  useCharts().destoryChart()
  ElMessage.info(chartsType)
  refDataType.value = chartsType
  useCharts().initChart(chartsType,userData.value,refDataType.value)
}



onMounted(()=>{
  let chart = useCharts().initChart('test_title',userData.value,refDataType.value);
})

</script>

<style scoped lang="scss">
.dash-contain{
  @apply w-full h-full;
  .card-contain{
    @apply w-full h-max flex flex-row  justify-around mt-1;
  }
  .chart-contain{
    @apply mt-10;

  }
  .more-chart{
    @apply w-full h-full flex items-center justify-around mt-5;

  }
}

</style>
