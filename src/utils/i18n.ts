import i18n from "@/i18n";
import { watch } from "vue";
import { Local } from "@/utils/storage";
import useAppStore from "@/store/modules/useAppStore";

export function i18nTitle(title?:string):string{
  if (title === undefined)
    return ''
  return i18n.global.t('msg.route.' + title)
}

export function i18nSetting(v:string):string{
  return i18n.global.t('msg.setting.'+v)
}

export function i18nNavBar(v:string):string {
  return i18n.global.t('msg.navbar.'+v)
}

export function i18nSkin(v:string):string{
  return i18n.global.t('msg.skin.' + v)
}

export function  i18nContext(v:string):string{
  return i18n.global.t('msg.contextMenu.'+v)
}

export function i18nProfile(v:string):string{
  return i18n.global.t('msg.profile.'+v)
}

export function i18nCardItem(v:string):string{
  return i18n.global.t('msg.cardItem.' + v)
}

export function i18nChartTitle(v:string):string{
  return i18n.global.t('msg.charts.' + v)
}

export function i18nAvatarFunction(v:string):string{
  return i18n.global.t('msg.avatarFunctions.' + v)
}

export function i18nGender(v:string):string{
  return i18n.global.t('msg.gender.' + v)
}

export function i18nAccountStatus(v:string):string{
  return i18n.global.t('msg.accountStatus.'+v)
}

export function SysI18n(v:string):string{
  return i18n.global.t('msg.'+v)
}

export function watchSwitchLang(...cbs:any){
  //@ts-ignore
  const store = useAppStore()
  watch(
    ()=>store.getAppLanguage,
    ()=>{
      cbs.forEach((cb:any)=>cb(store.getAppLanguage))
    }
  )
}


