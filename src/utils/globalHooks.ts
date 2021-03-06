import moment from "moment";
import { reactive, markRaw, defineAsyncComponent, ref } from "vue";
import { IDialog } from "@/interfaces/modules/global";
import { i18nAccountStatus, i18nDeleteStatus, i18nGender, watchSwitchLang } from "@/utils/i18n";

export default function(){
  const dateFormat = "YYYY-MM-DD HH:mm:ss z";

  watchSwitchLang(() => {
    avaOptions.forEach(item=>{
      item.label = i18nAccountStatus(item.value)
    })
    isDeletedOptions.forEach(item=>{
      item.label = i18nDeleteStatus(item.value)
    })
  });

  const avaOptions = [
    {
      label: i18nAccountStatus('available'),
      value: 1
    },
    {
      label: i18nAccountStatus('unavailable'),
      value: 0
    }
  ];
  const isDeletedOptions = [
    {
      label: i18nDeleteStatus('exists'),
      value: 1
    },
    {
      label: i18nDeleteStatus('deleted'),
      value: 0
    }
  ];
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

  const isDeletedType = (p:number) => {
    return p === 1 ? 'primary':'danger'
  }

  const formatDate = (v:any):string =>{
    return moment(v).format(dateFormat)
  }

  const formatOrderDate = (v:any) => {
    return moment(v).format('YYYY-MM-DD')
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
    view: markRaw(defineAsyncComponent(()=>import('@/views/Exception/404/Index.vue'))),
    title: '404',
    p: undefined,
  })

  const initDialogOption = () =>{
    dialogOption.isShow = false
    dialogOption.view =markRaw(defineAsyncComponent(()=>import('@/views/Exception/404/Index.vue')))
    dialogOption.title = ''
    dialogOption.p = undefined
  }

  return {
    dateFormat,
    formatDate,
    formatOrderDate,

    genderOptions,
    avaOptions,
    isDeletedOptions,

    componentSize,
    componentSizeOptions,
    pageSizes,
    dialogOption,
    setComponentSize,
    initDialogOption,
  }
}
