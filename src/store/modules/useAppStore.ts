import {defineStore} from "pinia";
import useUserStore from "@/store/modules/useUserStore";
import {useI18n} from "vue-i18n";
import {Local} from "@/utils/storage";
import theme_default from "@/assets/style/theme/default.scss"

// @ts-ignore
const useAppStore = defineStore({
    id: 'appStore',
    state:()=>({
        isCollapse: false,
        showSettings: false,
        lang: Local.getItem('app-language') || 'zh',
        theme: 'default',
        themes:[
          'default',
          'dark',
          'rose'
        ],
        menu:{
          menuActive: '#ffd04b'
        },
        breadcrumb:{
          hoverColor: '#409eff'
        }
    }),
    actions:{

      changeCollapse(){
        this.$state.isCollapse = !this.$state.isCollapse
      },
      changeShow(){
        this.$state.showSettings = !this.$state.showSettings
      },
      setLang(v:string){
        this.$state.lang = v
        Local.setItem('app-language',v)
      },
      setTheme(v:string){
        this.$state.theme = v
        Local.setItem('app-theme',v)
      }
    },
    getters:{
      getCollapse: (state)=>{
        return state.isCollapse
      },
      getShowSettings:(state)=>{
        return state.showSettings
      },
      getMenuActive:(state)=>{
        return state.menu.menuActive
      },
      getAppLanguage:(state):string=>{
        return state.lang
      },
      getAppTheme:(state):string=>{
        return state.theme
      },
      getAppThemes:(state):string[]|undefined=>{
        return state.themes
      },


    }
})


export default useAppStore
