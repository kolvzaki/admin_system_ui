import { ref } from "vue";
import { i18nCardItem } from "@/utils/i18n";

export default function(){
  let cardItem =  ref([
    {
      name: 'UserData',
      icon:'ant-design:user-outlined',
      data: 120,
      title: i18nCardItem('UserData'),
      bg: '#336699'
    },
    {
      name: 'MoneyData',
      icon:'ant-design:user-outlined',
      data: 120,
      title: i18nCardItem('MoneyData'),
      bg: '#006666'
    },
    {
      name: 'PlaygroundData',
      icon:'ant-design:user-outlined',
      data: 120,
      title: i18nCardItem('PlaygroundData'),
      bg: '#CCCC66'
    },
    {
      name: 'MessageData',
      icon:'ant-design:user-outlined',
      data: 120,
      title: i18nCardItem('MessageData'),
      bg: '#FF9966'
    }
  ])

  function initCardData(dataType:string){

  }

  return {
    cardItem
  }
}
