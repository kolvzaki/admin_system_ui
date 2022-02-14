import { reactive } from "vue";
import { i18nAccountStatus, i18nDeleteStatus, i18nGender, watchSwitchLang } from "@/utils/i18n";
import { queryModel } from "@/views/System/User/types/types";

export default function(){

  watchSwitchLang(() => {
    genderOptions.forEach(item=>{
      item.label = i18nGender(item.value)
    })
    avaOptions.forEach(item=>{
      item.label = i18nAccountStatus(item.value)
    })
    isDeletedOptions.forEach(item=>{
      item.label = i18nDeleteStatus(item.value)
    })
  });



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

  const query:queryModel = reactive({
    username: "",
    mobile: "",
    email:"",
    //gender: 0,
    isAvailable: 1,
    isDeleted: 1,
    page: 1,
    size: 5
  })

  const queryOptions = {
    isAvailable: avaOptions,
    isDeleted: isDeletedOptions,
    gender: genderOptions
  }

  const handleQueryData = (data:object) =>{

  }


  return{
    handleQueryData,
    query,
    queryOptions
  }

}
