import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import path from "path";
import useUserStore from "@/store/modules/useUserStore";


const routes: RouteRecordRaw[] = [];

const modules = import.meta.globEager("./modules/*.ts");
for (const path in modules) {
  routes.push(...modules[path].default);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

const allowList = ["/login", "/404", "/403"];
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (userStore.getToken) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (allowList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
