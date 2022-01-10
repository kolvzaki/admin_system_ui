import { ElMessage, ElMessageBox } from 'element-plus';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $confirm: typeof ElMessageBox.confirm;
  }
}
