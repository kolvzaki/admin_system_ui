import { IOrder, IOrderQuery } from "@/views/System/Order/types/types";
import { reactive, ref } from "vue";
import { i18nOrderStatus } from "@/utils/i18n";
import moment from "moment";
import {orderQuery} from '@/api/order'
import {ElMessage as msg} from 'element-plus'

export default function() {

  const OrderModel: IOrder = reactive({
    id:0,
    uid: 0,
    username: 'username',
    nickname: 'nickname',
    credit: 100,
    mobile: '15622997492',
    email: '123@qq.com',
    gid: 0,
    name: 'Ground',
    type: 'Type',
    cost: 50,
    orderDate: moment().format('YYYY-MM-DD'),
    orderTime : '08:00-10:00',
    score: 5,
    content: 'Content',
    status: 1,
    createdTime: moment().format('YYYY-MM-DD HH:mm:ss')
  });

  const OrderQuery: IOrderQuery = reactive({
    id: "", username: "", gid: "", name: "", type: "", orderDate: null,
    orderTime: "", status: 0,
    score: "",    page: 1,size:5,
  });

  const OrderStatusOptions = ref([
    {
      id: 0,
      label: i18nOrderStatus("unpaid"),
      value: 0
    },
    {
      id: 1,
      label: i18nOrderStatus("paid"),
      value: 1
    },
    {
      id: 2,
      label: i18nOrderStatus("running"),
      value: 2
    },
    {
      id: 3,
      label: i18nOrderStatus("finished"),
      value: 3
    },
    {
      id: 4,
      label: i18nOrderStatus("cancel"),
      value: -1
    }
  ]);

  const scoreOptions = ref([
    0, 1, 2, 3, 4, 5
  ]);
  const timeOptions = ref([
    '08:00-10:00', '10:00-12:00','12:00-14:00', '14:00-16:00','16:00-18:00','18:00-20:00','20:00-22:00'
  ])

  const getLabelByValue = (val: number): string => {
    let res: string = "";
    OrderStatusOptions.value.forEach((ele) => {
      if (ele.value === val) {
        res = ele.label;
      }
    });
    //console.log(res);
    return res;
  };

  const timeSelectField = ["orderDate"];

  const tableData = ref<IOrder[]>([
    {
      id:0,
      uid: 0,
      username: 'username',
      nickname: 'nickname',
      credit: 100,
      mobile: '15622997492',
      email: '123@qq.com',
      gid: 0,
      name: 'Ground',
      type: 'Type',
      cost: 50,
      orderDate: moment().format('YYYY-MM-DD'),
      orderTime : '08:00-10:00',
      score: 5,
      content: 'Content',
      status: 3,
      createdTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  ]);
  const total = ref<number>(0);

  const initModel = () => {
    OrderModel.id = OrderModel.status = 0;
    OrderModel.username = OrderModel.createdTime = "";
  };

  const queryOrder = (query: IOrderQuery) => {
    orderQuery(OrderQuery).then((res)=>{
      msg.success("Success")
    }).catch(err=>{
      msg.error(err)
      console.log(err);
    })
  };


  return {
    OrderModel,
    OrderQuery,
    timeSelectField,
    scoreOptions,
    timeOptions,
    OrderStatusOptions,

    getLabelByValue,
    tableData,
    total,

    queryOrder

  };

}
