import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'animate.css';
import '@/assets/style/app.scss'
import '@purge-icons/generated';
import 'element-plus/dist/index.css'

import * as Icons from '@element-plus/icons-vue';
import i18n from "@/i18n";

import {createPinia} from "pinia";

const pinia = createPinia()
const app = createApp(App)
  .use(router)
  .use(i18n)
  .use(pinia)

Object.keys(Icons).forEach(key=>{
  app.component(key,Icons[key as keyof typeof Icons])
})

app.mount('#app')

