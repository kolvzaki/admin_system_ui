import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import PurgeIcons from 'vite-plugin-purge-icons'
import {loadEnv} from "vite";



const resolver = (p:string)=>{
  return path.resolve(__dirname,p);
}

// https://vitejs.dev/config/ 按需引入插件

export default defineConfig({
  plugins: [
      vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    PurgeIcons({
        content:[
            '**/*.html',
            '**/*.js',
            '**/*.vue'
        ],
    }),
  ],
  css:{
    preprocessorOptions:{
        scss:{

        }
    }
  },
  server:{
    strictPort: true,
    open: true,
  },
  resolve:{
    alias:{
      '@': resolver('./src')
    }
  },

})
