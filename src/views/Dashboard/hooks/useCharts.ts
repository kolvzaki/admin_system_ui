import * as echarts from "echarts"
import  moment from 'moment';
import { i18nChartTitle } from "@/utils/i18n";

export default function(){
  let charts = null;
  let types = [
    'User','Money','Playground','Message'
  ];
  let options = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend:{
      data:[]
    },
    xAxis: {
      name: 'Date',
      boundaryGap:false,
      type:'category',
      data:[''],
    },
    yAxis: {

    },
    series: [
      {
        name: 'value',
        type: 'line',
        smooth: true,
        areaStyle:{
          color: '#99CCFF'
        },
        symbol:'circle',
        symbolSize: 15,
        data:['']
      },
    ],

  }

  function changeOptions(title:string,data:any,type:string){
    options.title.text = title
    options.legend.data = []
    options.xAxis.data = []
    for(let i = 7;i>0;i--){
      options.xAxis.data.push(moment().subtract(i, 'days').format('YYYY-MM-DD'))
    }
    if (data){
      options.series[0].data = data
    }
    return options
  }

  function initChart(title:string,data:object,type:string){
    // @ts-ignore
    charts = echarts.init(document.getElementById("app-charts"))
    //console.log(options.title.text);
    //@ts-ignore
    charts.setOption(changeOptions(title, data, type))
    return charts
  }

  function destoryChart(){
    // @ts-ignore
    echarts.dispose(document.getElementById("app-charts"))
  }

  return{
    initChart,
    changeOptions,
    destoryChart
  }

}
