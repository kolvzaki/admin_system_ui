import { i18nGender } from "@/utils/i18n";
import moment from "moment";
import { reactive, Component, toRefs, ref } from "vue";

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

  return {
    dateFormat,
    formatDate,
    genderOptions,
  }
}
