import { createPinia } from "pinia";
import useAppStore from "@/store/modules/useAppStore";
import useUserStore from "@/store/modules/useUserStore";

const pinia = createPinia()

export {useAppStore,useUserStore}
export default pinia
