import { defineStore } from "pinia";
import { Session } from "@/utils/storage";
import pinia from "@/store";


const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    token: Session.getItem("token") || "",
    info: Session.getItem("info") || {},
    roles: Session.getItem("roles") || [],
    permissions: Session.getItem("permissions") || []
  }),

  actions: {
    setLoginInfo(data: any) {
      Session.setItem("token", data?.token);
      Session.setItem("roles", data?.role);
      Session.setItem("permissions", data?.permission);
      Session.setItem("info", data?.info);
      this.$state.token = data?.token;
      this.$state.roles = data?.role;
      this.$state.permissions = data?.permission;
      this.$state.info = data?.info;
    },

    setInfo(data: object) {
      this.info = data;
      Session.setItem("info", data);
    },

    clearInfo() {
      Session.clearAll();
      this.$reset();
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getRoles(state) {
      return state.roles;
    },
    getPermissions(state) {
      return state.permissions;
    },
    getInfo(state) {
      return state.info;
    },
    getAvatar(state) {
      return state.info.avatar || "";
    }

  }
});


export default useUserStore;

export function useUserStoreOutside() {
  return useUserStore(pinia);
}
