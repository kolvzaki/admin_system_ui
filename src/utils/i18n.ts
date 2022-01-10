import i18n from "@/i18n";

export function i18nTitle(title:string):string{
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
