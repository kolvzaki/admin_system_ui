import { IOrder, IOrderQuery } from "@/views/System/Order/types/types";
import { reactive, ref } from "vue";
import { i18nOrderStatus } from "@/utils/i18n";

export default function(){

  const OrderModel:IOrder = reactive({
    id: '',username: "", ground: '',  status: 0, createdTime: ""
  })

  const OrderQuery:IOrderQuery = reactive({
    id: '',username: "", ground: '',  status: 0,minTime:"",maxTime:""
  })

  const OrderStatusOptions = ref([
    {
      id: 0,
      label: i18nOrderStatus('unpaid'),
      value: 0,
    },
    {
      id: 1,
      label: i18nOrderStatus('paid'),
      value: 1,
    },
    {
      id:2,
      label: i18nOrderStatus('running'),
      value: 2
    },
    {
      id:3,
      label: i18nOrderStatus('finished'),
      value:3
    },
    {
      id:4,
      label: i18nOrderStatus('cancel'),
      value: -1
    }
  ])

  const getLabelByValue = (val:number):string =>{
    let res:string = '';
    OrderStatusOptions.value.forEach((ele)=>{
      if (ele.value === val){
        res = ele.label
      }
    })
    console.log(res);
    return res
  }

  const timeSelectField = ['createdTime','minTime','maxTime']

  const tableData = ref<IOrder[]>([
    {
      id: 0,
      username: 'test',
      ground: 0,
      status: -1,
      createdTime: new Date().toDateString()
    }
  ])
  const total = ref<number>(0)




  const initModel = () => {
    OrderModel.id = OrderModel.ground = OrderModel.status = 0
    OrderModel.username = OrderModel.createdTime = ""
  }

  const queryOrder = (query:IOrderQuery) =>{


  }

  return{
    OrderModel,
    OrderQuery,
    timeSelectField,

    OrderStatusOptions,
    getLabelByValue,
    tableData,
    total,

  }

}
