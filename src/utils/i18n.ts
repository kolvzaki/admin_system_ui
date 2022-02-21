import i18n from "@/i18n";
import { watch } from "vue";
import { Local } from "@/utils/storage";
import useAppStore, { useAppStoreOutside } from "@/store/modules/useAppStore";

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

export function i18nGender(v:string | number):string{
  if (typeof v === 'number'){
    if (v === 0){
      return i18n.global.t('msg.gender.Female')
    }
    return i18n.global.t('msg.gender.Male')
  }
  return i18n.global.t('msg.gender.' + v)
}

export function i18nAccountStatus(v:string | number):string{
  if (typeof v === 'number'){
    if (v === 0){
      return i18n.global.t('msg.accountStatus.unavailable')
    }
    return i18n.global.t('msg.accountStatus.available')
  }
  return i18n.global.t('msg.accountStatus.'+v)
}

export function SysI18n(v:string):string{
  return i18n.global.t('msg.'+v)
}

export function i18nDeleteStatus(v:string | number):string{
  if (typeof v === 'number'){
    if (v === 0){
      return i18n.global.t('msg.DeleteStatus.deleted')
    }
    return i18n.global.t('msg.DeleteStatus.exists')
  }
  return i18n.global.t('msg.DeleteStatus.' + v)
}

export function i18nRoleQuery(v:string):string{
  return i18n.global.t('msg.roleQuery.' + v)
}

export function i18nUserQuery(v:string):string{
  if (v === 'page' || v==='size'){
    return "";
  }
  return i18n.global.t('msg.userQuery.'+v)
}

export function i18nGroundQuery(v:string):string{
  return i18n.global.t('msg.groundQuery.'+v)
}

export function i18nPermissionQuery(v:string):string{
  return i18n.global.t('msg.permissionQuery.' + v)
}

export function i18nOrderQuery(v:string):string{
  return i18n.global.t('msg.orderQuery.'+v)
}

export function i18nOrderModel(v:string):string{
  return i18n.global.t('msg.orderModel.'+v)
}

export function i18nOrderStatus(v:string):string{
  return i18n.global.t('msg.OrderStatus.'+v);
}

export function i18nGroundStatus(v:string):string{
  return i18n.global.t('msg.groundStatus.'+v);
}

export function watchSwitchLang(...cbs:any){

  const appStore = useAppStoreOutside()
  watch(
    ()=>appStore.getAppLanguage,
    ()=>{
      cbs.forEach((cb:any)=>cb(appStore.getAppLanguage))
    }
  )
}


