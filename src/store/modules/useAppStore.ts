import { defineStore } from "pinia";
import { Local, Session } from "@/utils/storage";
import pinia from "@/store";


const useAppStore = defineStore({
  id: "appStore",
  state: () => ({
    isCollapse: false,
    isScreenFull: false,
    showSettings: false,
    lang: Local.getItem('app-language') || "zh",
    tagsViewList: Local.getItem('app-tags')||[],
  }),
  actions: {

    async clearInfo(){
      await this.$reset()
      Local.setItem('app-tags',[])
      this.$state.tagsViewList = []
    },

    changeCollapse() {
      this.$state.isCollapse = !this.$state.isCollapse;
    },
    changeShow() {
      this.$state.showSettings = !this.$state.showSettings;
    },

    setLang(v: string) {
      this.$state.lang = v;
      Local.setItem("app-language", v);
    },

    setScreenFull(v: boolean) {
      this.$state.isScreenFull = v;
      Local.setItem("is-screen-full", this.$state.isScreenFull);
    },
    addTagsViewList(tag: any) {
      const f = this.tagsViewList.find((item: any) => {
        return item.path === tag.path;
      });
      if (!f) {
        this.$state.tagsViewList.push(tag);
        Local.setItem("app-tags", this.tagsViewList);
      }
    },

    changeTagsView(index: number, tag: object) {
      this.$state.tagsViewList[index] = tag;
      Local.setItem("app-tags", this.tagsViewList);
    },

    removeTagsView(item: {
      type: string,
      index: number
    }) {
      if (item.type === "index") {
        this.$state.tagsViewList.splice(item.index, 1);
      } else if (item.type === "other") {
        this.$state.tagsViewList.splice(item.index + 1, this.$state.tagsViewList.length - item.index + 1);
        this.$state.tagsViewList.splice(0, item.index);

      } else if (item.type === "right") {
        this.$state.tagsViewList.splice(item.index + 1, this.$state.tagsViewList.length - item.index + 1);
      }
      Local.setItem("app-tags", this.$state.tagsViewList);
    }
  },
  getters: {
    getCollapse: (state) => {
      return state.isCollapse;
    },
    getShowSettings: (state) => {
      return state.showSettings;
    },
    getAppLanguage: (state): string => {
      return state.lang;
    },
    getScreenFull: (state): boolean => {
      return state.isScreenFull;
    },
    getAppTags: (state) => {
      state.tagsViewList = Local.getItem("app-tags");
      return state.tagsViewList || [];
    }
  }

});


export default useAppStore;

export function useAppStoreOutside(){
  return useAppStore(pinia)
}
