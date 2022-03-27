<template>
  <div class="order-manage-contain">
    <transition name="filterAnime">
      <div class="top-contain" v-show="isFold">
        <el-form label-width="120px" class="query-form-contain" :size="componentSize" inline
                 v-model="OrderQuery">
          <el-form-item v-for="o in Object.keys(OrderQuery)" :label="i18nOrderQuery(o)" class="query-item-contain">
            <el-date-picker v-if="timeSelectField.indexOf(o) !== -1" v-model="OrderQuery[o]"></el-date-picker>
            <el-select v-else-if="o === 'status'" v-model="OrderQuery[o]" clearable>
              <el-option v-for="opt in OrderStatusOptions" :key="opt.id" :label="opt.label"
                         :value="opt.value"></el-option>
            </el-select>
            <el-select v-else-if="o==='score'" v-model="OrderQuery[o]" clearable>
              <el-option v-for="score in scoreOptions" :key="score" :label="score" :value="score"></el-option>
            </el-select>
            <el-select v-else-if="o ==='orderTime'" clearable v-model="OrderQuery[o]">
              <el-option v-for="(item,index) in timeOptions" :key="index" :label="item" :value="item"></el-option>
            </el-select>
            <el-input v-else-if="!isPage(o)" v-model="OrderQuery[o]"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </transition>
    <div class="button-contain">
      <el-button :size="componentSize" type="primary" :icon="Search" class="hvr-pulse">
        {{ SysI18n("button.search") }}
      </el-button>
      <el-button :size="componentSize" :icon="isFold?ArrowUp:ArrowDown" type="warning" @click="foldFilter">
        {{ isFold ? SysI18n("button.fold") : SysI18n("button.unfold") }}
      </el-button>
    </div>
    <el-divider>
      <svg-icon icon="emojione-v1:star"></svg-icon>
    </el-divider>

    <div class="table-contain">
      <el-table :data="tableData" border highlight-current-row>
        <el-table-column prop="id" :label="i18nOrderModel('id')" align="center" width="100" />
        <el-table-column prop="username" :label="i18nOrderModel('username')" align="center" />
        <el-table-column prop="name" :label="i18nOrderModel('name')" align="center" />
        <el-table-column prop="type" :label="i18nOrderModel('type')" align="center" width="100" />
        <el-table-column :label="i18nOrderModel('orderTime')" align="center">
          <template #default="scope">
            {{ formatOrderDate(scope.row.orderDate) + " " + scope.row.orderTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="i18nOrderModel('status')" align="center">
          <template #default="scope">
            <el-tag :type="tagsType(scope.row.status)">
              {{ getLabelByValue(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" :label="i18nOrderModel('createdTime')" align="center">
          <template #default="scope">
            {{ formatDate(scope.row.createdTime) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Operation" width="120">
          <template #default="scope">
            <el-button type="primary" icon="Document" :size="componentSize"
                       @click="showOrderDetail(scope.$index,scope.row)"></el-button>
            <!--            <el-button type="default" icon="check" :size="componentSize"></el-button>-->
            <el-button type="danger" icon="delete" :size="componentSize"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-contain">
      <el-pagination background
                     @size-change="handleSizeChange" @current-change="handlePageChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :page-size="OrderQuery.size" :current-page="OrderQuery.page" :total="total"
                     :page-sizes="pageSizes">
      </el-pagination>
    </div>
    <el-dialog v-model="dialogDisplay" width="60%" lock-scroll destroy-on-close :title="SysI18n('OrderDetail.title')" center>
      <template #default>
        <div class="title-contain">
          <span>订单编号:{{ orderDetail.id }}</span>
          <span>创建时间:{{ orderDetail.createdTime }}</span>
        </div>
        <el-descriptions border :size="componentSize" title="预约用户" class="info-contain">
          <el-descriptions-item label="用户ID" align="center" label-class-name="item-list" class-name="content">{{ orderDetail.uid }}</el-descriptions-item>
          <el-descriptions-item label="用户名" align="center" label-class-name="item-list" class-name="content">
            <el-link type="info" style="font-size: 16px;font-weight: bold" @click="searchUser(orderDetail.username)">
              {{ orderDetail.username }}
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="称呼" align="center" label-class-name="item-list" class-name="content">{{ orderDetail.nickname }}</el-descriptions-item>
          <el-descriptions-item label="信用分" align="center" label-class-name="item-list" class-name="content">{{ orderDetail.credit }}</el-descriptions-item>
          <el-descriptions-item label="联系电话" align="center" label-class-name="item-list" class-name="content">{{ orderDetail.mobile }}</el-descriptions-item>
          <el-descriptions-item label="联系邮箱" align="center" label-class-name="item-list" class-name="content">{{ orderDetail.email }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions border :size="componentSize" title="预约场地"  direction="vertical" class="info-contain">
          <el-descriptions-item label="场地ID" align="center" label-class-name="item-list" class-name="content">
            <el-link type="info" style="font-size: 16px;font-weight: bold" @click="searchGround(orderDetail.gid)">
              {{ orderDetail.gid }}
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="场地名称" align="center" label-class-name="item-list" class-name="content">
            {{orderDetail.name}}
          </el-descriptions-item>
          <el-descriptions-item label="场地类别" align="center" label-class-name="item-list" class-name="content">
            {{orderDetail.type}}
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions border :size="componentSize" title="预约信息" direction="vertical" class="info-contain">
          <el-descriptions-item label="预约日期" align="center" label-class-name="item-list" class-name="content">
            {{ orderDetail.orderDate }}
          </el-descriptions-item>
          <el-descriptions-item label="预约时间" align="center" label-class-name="item-list" class-name="content">
            {{orderDetail.orderTime}}
          </el-descriptions-item>
          <el-descriptions-item label="订单状态" align="center" label-class-name="item-list" class-name="content">
            <el-tag :type="tagsType(orderDetail.status)">
              {{ getLabelByValue(orderDetail.status) }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions border :size="componentSize" title="用户评价" :column="1" class="info-contain" v-if="orderDetail.status===3">
          <el-descriptions-item label="评分" label-class-name="item-list" class-name="content" align="center">
            <el-rate v-model="orderDetail.score" size="large" disabled show-score score-template="{value}"></el-rate>
          </el-descriptions-item>
          <el-descriptions-item label="评价" label-class-name="item-list" class-name="content" align="center">
            {{orderDetail.content}}
          </el-descriptions-item>
        </el-descriptions>
      </template>

      <template #footer>
        <el-button @click="dialogDisplay=false" type="primary">{{SysI18n('button.close')}}</el-button>
      </template>

    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import globalHooks from "@/utils/globalHooks";
import useOrder from "@/views/System/Order/hooks/useOrder";
import { i18nOrderQuery, i18nOrderModel, SysI18n } from "@/utils/i18n";
import { computed, onMounted, reactive, ref } from "vue";
import { Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import router from "@/router";

const { componentSize, formatDate, formatOrderDate } = globalHooks();
const {
  OrderQuery,
  timeSelectField,
  OrderStatusOptions,
  tableData,
  total,
  OrderModel,
  getLabelByValue,
  scoreOptions,
  timeOptions,
  queryOrder
} = useOrder();

const pageSizes = ref([
  1, 2, 5, 10, 20
]);
const isPage = (v: string) => {
  return ["page", "size"].indexOf(v) !== -1;
};

//TODO: Finish query part.
onMounted(()=>{
  queryOrder(OrderQuery)
})

const showOrderDetail = (index: number, row: object) => {
  dialogDisplay.value = true;
  Object.assign(orderDetail, row);
};
const dialogDisplay = ref(false);
const orderDetail = reactive({});

const handlePageChange = (val: number) => {

};

const handleSizeChange = (val: number) => {

};

const searchUser = (username:string) => {
  dialogDisplay.value = false
  router.replace({
    path: '/system/user',
    query:{
      username:username
    }
  })
}

const searchGround = (gid:number) => {
  dialogDisplay.value = false
  router.replace({
    path: '/system/playground',
    query:{
      gid:gid
    }
  })
}

const isFold = ref(false);
const foldFilter = () => {
  isFold.value = !isFold.value;
};

const tagsType = (status: number) => {
  switch (status) {
    case 0: {
      return "info";
    }
    case 1: {
      return "default";
    }
    case 2: {
      return "warning";
    }
    case 3: {
      return "success";
    }
    case -1: {
      return "danger";
    }
    default: {
      return "default";
    }
  }
};


</script>

<style scoped lang="scss">
.info-contain{
  margin-top: 20px;
}
.title-contain{
  @apply w-full h-max flex flex-1 items-center justify-between text-lg font-bold py-5;
}
.order-manage-contain {
  @apply w-full h-full overflow-hidden;
  transition: all ease-in-out .5s;

  .top-contain {
    @apply w-full h-max;
  }

  .button-contain {
    @apply w-max h-max;
    transition: all ease-in-out .5s;
    margin: 0 auto;
  }

  .table-contain {
    @apply w-full h-max mt-10;
  }

  .pagination-contain {
    @apply w-max h-max pt-5;
    margin: 0 auto;
  }
}
.filterAnime-enter-active {
  animation: fadeInDown .5s;
}

.filterAnime-leave-active {
  animation: fadeOutUp .5s;
}

</style>
<style>

.item-list{
  font-size: 16px;
  background: #9cddf3 !important;
  color: #000 !important;
}

.content{
  font-size: 16px;
  font-weight: bold !important;
}
</style>
