<template>
  <div class="role-contain">
    <div class="top-contain">
      <div class="query-contain">
        <el-input class="query" clearable v-model="query" :size="componentSize" placeholder="Query Role Name" />
        <el-input clearable class="query" :size="componentSize"></el-input>
      </div>
      <el-button type="primary" :size="componentSize">Search</el-button>
      <el-button type="success" :size="componentSize">Create</el-button>
    </div>

    <div class="table-contain">
      <el-table :data="tableData" border style="width: 100%" highlight-current-row>
        <el-table-column prop="date" label="Date" align="center" />
        <el-table-column prop="name" label="Name" align="center" />
        <el-table-column prop="address" label="Address" align="center" />
        <el-table-column align="center">
          <template #default="scope">
            <el-button :size="componentSize" icon="refresh"
            ></el-button
            >
            <el-button
              :size="componentSize"
              icon="delete"
              type="danger"
            ></el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-card class="permission-show-contain">
      <template #header>
        <div class="card-header">
          <span>
            <svg-icon icon="icon-park-outline:permissions" class-name="title-icon"></svg-icon>
            Role-Permission
          </span>
          <el-button type="primary" :size="componentSize">Add</el-button>
        </div>
      </template>
      <div class="card-content">
        <transition-group name="tagsAnime">
          <el-tag class="permission-tags" v-for="o in permissions" closable @close="handleClose">
            {{o}}
          </el-tag>
        </transition-group>
      </div>
    </el-card>



  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

const componentSize = ref("mini");
const query = ref("");

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];

const permissions = ref([
  'a','b','c','d'
])

const handleClose = () =>{
  permissions.value.pop()
}

</script>

<style scoped lang="scss">
.role-contain {
  @apply w-full h-full;
  transition: all ease .5s;

  .top-contain {
    @apply w-full h-max flex;
    .query-contain {
      @apply w-max h-max flex;
      .query {
        @apply mr-2;
      }
    }
  }

  .table-contain {
    @apply w-full h-max mt-3;
  }

  .permission-show-contain {
    @apply w-full h-max mt-3;
    .card-header{
      @apply h-5 flex items-center justify-between;
    }
    .card-content{
      @apply w-full;
      .permission-tags{
        @apply mx-3;
        transition: all ease-in .3s;
      }
    }
  }
}

.tagsAnime-enter-from,
.tagsAnime-leave-to{
  opacity: 0;
  transform: translateY(30px);
}

.tagsAnime-leave-active {
  position: absolute;
}


</style>
