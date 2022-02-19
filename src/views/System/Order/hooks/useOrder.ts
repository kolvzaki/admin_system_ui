import { IOrder, IOrderQuery } from "@/views/System/Order/types/types";
import { reactive } from "vue";

export default function(){

  const OrderModel:IOrder = reactive({
    id: 0,username: "", ground: 0,  status: 0, createdTime: ""
  })

  const OrderQuery:IOrderQuery = reactive({
    id: 0,username: "", ground: 0,  status: 0, createdTime: "",minTime:"",maxTime:""
  })

  const timeSelectField = ['createdTime','minTime','maxTime']

  const initModel = () => {
    OrderModel.id = OrderModel.ground = OrderModel.status = 0
    OrderModel.username = OrderModel.createdTime = ""
  }

  const queryOrder = (query:IOrderQuery) =>{


  }

  return{
    OrderModel,
    OrderQuery,
    timeSelectField
  }

}
