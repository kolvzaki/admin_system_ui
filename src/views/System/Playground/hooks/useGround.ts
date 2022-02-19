import { IGround, IGroundQuery } from "@/views/System/Playground/types/types";
import { computed, onMounted, reactive, ref } from "vue";
import globalHooks from "@/utils/globalHooks";
import { groundQuery,getGroundTypes,groundCreate } from "@/api/playground";
import { ElMessage as message } from "element-plus";

export default function(){

  const {avaOptions,isDeletedOptions} = globalHooks()

  const tableData = ref<IGround[]>([])
  const total = ref(0)

  const inputList = ['name','id']
  const isInput = (o:string) =>{
    return inputList.indexOf(o) !== -1
  }
  const optionsList = ['isAvailable','type','isDeleted']
  const isQueryOptions = (o:string) =>{
    return optionsList.indexOf(o) !==-1
  }

  const GroundTypes = ():string[] =>{
    let types:string[] = []
    getGroundTypes().then(res=>{
      const {data} = res
      types = data
    })
    return types
  }

  const getTypesOption = (types:string[]) =>{
    let res:{
      label:string,
      value:string
    }[] = []
    types.forEach((val => {
      res.push({
        label: val,
        value:val
      })
    }))
    return res;
  }

  const isEditable = ['isDeleted','isAvailable']
  const initModel = () =>{
    GroundModel.id = GroundModel.name = GroundModel.type = ''
    GroundModel.isAvailable = 1
    GroundModel.isDeleted = 0
  }

  const queryOption = {
    isAvailable: avaOptions,
    isDeleted:isDeletedOptions,
    type:{},
  }

  const GroundModel:IGround=reactive({
    id: '',
    name: '',
    type: '',
    isDeleted: 0,
    isAvailable: 1,
  })

  const GroundQuery:IGroundQuery = reactive({
    id: '',
    name: '',
    type: '',
    isDeleted: 1,
    isAvailable: 1,
    page: 1,
    size: 5
  })


  const queryGround = (query:IGroundQuery) =>{
    groundQuery(query).then(res=>{
      message.success('Query Success')
      const { data } = res
      total.value = data.total
      tableData.value = data.list
      //queryOption.type = getTypesOption(GroundTypes())
    }).catch(err=>{
      console.log(err);
    })
  }

  const createGround = async (data:IGround) => {
    groundCreate(data).then(res=>{
      console.log(res);
      message.success('Create Success')
      initModel()
    }).catch(err=>{
      console.log(err);
    })
    queryGround(GroundQuery)
  }

  const deleteGround = (param:number|string) =>{

    queryGround(GroundQuery)
  }

  const updateGround = (data:IGround) => {

    queryGround(GroundQuery)
  }



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

    isQueryOptions,
    isInput,

  }

}
