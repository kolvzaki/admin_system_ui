import { IGround, IGroundQuery } from "@/views/System/Playground/types/types";
import { computed, onMounted, reactive, ref } from "vue";
import globalHooks from "@/utils/globalHooks";
import { groundQuery, getGroundTypes, groundCreate, groundDelete, disableGround } from "@/api/playground";
import { ElMessage as message } from "element-plus";
import { i18nGroundStatus } from "@/utils/i18n";



export default function() {

  const { avaOptions, isDeletedOptions } = globalHooks();

  const tableData = ref<IGround[]>([]);
  const total = ref(0);

  const inputList = ["name", "id"];
  const isInput = (o: string) => {
    return inputList.indexOf(o) !== -1;
  };
  const optionsList = ["isAvailable", "type", "isDeleted", "status"];
  const isQueryOptions = (o: string) => {
    return optionsList.indexOf(o) !== -1;
  };

  const groundStatusOptions = [
    {
      label: i18nGroundStatus("free"),
      value: 1
    },
    {
      label: i18nGroundStatus("occupied"),
      value: 0
    }
  ];

  const rawTypes = ref<string[]>([]);
  const groundTypeOptions = ref<{ label: string, value: string }[]>([]);


  const getGroundTypeOptions = () => {
    initOptions();
    getGroundTypes().then(res => {
      rawTypes.value = res.data;
      rawTypes.value.forEach((val: string) => {
        groundTypeOptions.value.push({
          label: val,
          value: val
        });
      });
    }).catch(err => {
      console.log(err);
    });
  };

  const isEditable = ["isDeleted", "isAvailable"];
  const initModel = () => {
    GroundModel.id = GroundModel.name = GroundModel.type = "";
    GroundModel.isAvailable = 1;
    GroundModel.isDeleted = 0;
  };
  const initOptions = () => {
    queryOption.type = [];
  };

  let queryOption = reactive({
    isAvailable: avaOptions,
    isDeleted: isDeletedOptions,
    type: groundTypeOptions,
    status: groundStatusOptions
  });

  const GroundModel: IGround = reactive({
    id: "",
    name: "",
    type: "",
    pics: "",
    cost: 0,
    status: 1,
    isDeleted: 0,
    isAvailable: 1
  });

  const GroundQuery: IGroundQuery = reactive({
    id: "",
    name: "",
    type: "",
    status: 1,
    isDeleted: 1,
    isAvailable: 1,
    page: 1,
    size: 5
  });


  const queryGround = (query: IGroundQuery) => {
    groundQuery(query).then(res => {
      const { data } = res;
      total.value = data.total;
      tableData.value = data.list;
      getGroundTypeOptions();
    }).catch(err => {
      console.log(err);
    });
  };

  const createGround = async (data: IGround) => {
    groundCreate(data).then(res => {
      //console.log(res);
      message.success("Create Success");
      initModel();
    }).catch(err => {
      console.log(err);
    });
  };

  const deleteGround = async (data:IGround,param:number) => {
    await groundDelete(data,param).then(res=>{
      message.success('Delete Success')
      //console.log(res);
    }).then(err=>{
      console.log(err);
    })
    queryGround(GroundQuery);
  };

  const groundDisable = async (data:IGround,param:number) =>{
    await disableGround(data,param).then(res=>{
      message.success('Status Change Success')
    }).then(err=>{
      console.log(err);
    })
    queryGround(GroundQuery);
  }

  const updateGround = (data: IGround) => {

  };


  return {
    tableData,
    total,
    GroundModel,
    GroundQuery,
    queryOption,

    queryGround,
    createGround,
    deleteGround,
    updateGround,
    groundDisable,


    isQueryOptions,
    isInput,
    getGroundTypeOptions,

  };

}
