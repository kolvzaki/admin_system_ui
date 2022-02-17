import { i18nGender } from "@/utils/i18n";
import moment from "moment";
import { reactive, markRaw, defineAsyncComponent, ref } from "vue";
import { IDialog } from "@/interfaces/modules/global";

export default function(){
  const dateFormat = "YYYY/MM/D HH:mm:ss z";
  const genderOptions = [
    {
      label: i18nGender("Male"),
      value: 1
    },
    {
      label: i18nGender("Female"),
      value: 0
    }
  ];
  const formatDate = (v:string):string =>{
    return moment(v).format(dateFormat)
  }

  const componentSizeOptions = [
    'mini','small', 'default','large'
  ]

  const pageSizes = [1,5,10,15,20]
  const componentSize = ref('small')
  const setComponentSize = (size:string) =>{
    componentSize.value = size
  }

  const dialogOption:IDialog = reactive({
    isShow: false,
    view: markRaw(defineAsyncComponent(()=>import('@/views/Exception/403/Index.vue'))),
    title: '404',
    p: undefined,
  })

  return {
    dateFormat,
    formatDate,
    genderOptions,
    componentSize,
    componentSizeOptions,
    pageSizes,
    dialogOption,
    setComponentSize,
  }
}
