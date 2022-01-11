import {defineStore} from "pinia";
import useUserStore from "@/store/modules/useUserStore";
import {useI18n} from "vue-i18n";
import {Local} from "@/utils/storage";
import theme_default from "@/assets/style/theme/default.scss"
import screenfull from "screenfull";

// @ts-ignore
const useAppStore = defineStore({
    id: 'appStore',
    state:()=>({
        isCollapse: false,
        isScreenFull: false,
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
      },
      setScreenFull(v:boolean){
        this.$state.isScreenFull = v
        Local.setItem('is-screen-full',this.$state.isScreenFull)
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
      getScreenFull:(state):boolean=>{
        return state.isScreenFull
      }

    }
})


export default useAppStore
