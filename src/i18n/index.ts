import zh from './zh'
import en from './en'

import {createI18n} from "vue-i18n";
import {Local} from "@/utils/storage";
import { useAppStoreOutside } from "@/store/modules/useAppStore";



const msg = {
  zh:{
    msg:{
      ...zh
    }
  },
  en:{
    msg:{
      ...en
    }
  }
}


const locale = useAppStoreOutside().getAppLanguage

const i18n = createI18n({
  legacy:false,
  globalInjection: true,
  locale: locale,
  messages: msg
})

export default i18n

