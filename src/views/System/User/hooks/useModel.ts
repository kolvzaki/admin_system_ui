import { onMounted, reactive, ref } from "vue";
import { i18nAccountStatus, i18nDeleteStatus, i18nGender, watchSwitchLang } from "@/utils/i18n";
import { queryModel } from "@/views/System/User/types/types";
import globalHooks from "@/utils/globalHooks";
import { getAllRoles } from "@/api/role";


export default function() {

  watchSwitchLang(() => {
    genderOptions.forEach(item => {
      item.label = i18nGender(item.value);
    });
    avaOptions.forEach(item => {
      item.label = i18nAccountStatus(item.value);
    });
    isDeletedOptions.forEach(item => {
      item.label = i18nDeleteStatus(item.value);
    });
  });

  const { genderOptions, avaOptions, isDeletedOptions } = globalHooks();


  const query: queryModel = reactive({
    username: "",
    mobile: "",
    email: "",
    //gender: 0,
    isAvailable: 1,
    isDeleted: 1,
    role: "",
    page: 1,
    size: 5
  });

  const userModel = reactive({
    avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F2d5d32b3de9c0d48fe55d1a4f0374b3b0f2c691f.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647606746&t=85e6e2c102d631c20fb1a843c0349ba3",
    nickname: "",
    mobile: "",
    email: "",
    role: '',
    password: "123456",
    isAvailable: 1,
    isDeleted: 1
  });

  const queryOptions = {
    isAvailable: avaOptions,
    isDeleted: isDeletedOptions,
    gender: genderOptions,
    role: <any>[]
  };

  const getRoleOptions = (data: any[]) => {
    data.forEach((val) => {
      queryOptions.role.push({
        label: val.name,
        value: val.name,
        id: val.id
      });
    });
  };

  onMounted(() => {
    getAllRoles().then(res => {
      getRoleOptions(res.data);
    }).catch(err => {
      console.log(err);
    });
  });

  const tableData = ref([]);
  const total = ref(0);


  const unEditable = ["password","rid","isAvailable", "isDeleted", "createdTime", "createdTime", "lastLoginTime", "updateTime", "id","username"];

  const handleQueryData = (data: object) => {

  };


  return {
    handleQueryData,
    query,
    queryOptions,
    userModel,
    unEditable,
    tableData,
    total
  };

}
