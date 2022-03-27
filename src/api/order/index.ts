import service from "@/request/request";
import { IOrderQuery } from "@/views/System/Order/types/types";

const api = {
  queryOrder: '/order/query',
  orderDetail: '/order/detail',
  deleteOrder: '/order/delete',
  updateOrder: '/order/update'
}

export const orderQuery = (query:IOrderQuery) =>{
  return service.get(api.queryOrder,{
    params:query
  })
}

