<template>
    <div class="profile-contain">
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <span>{{ i18nProfile("title") }}</span>
            <div class="operation-contain">
              <el-button class="hvr-pop" type="success" size="mini" @click="showEditCard">
                {{ i18nProfile("updateButton") }}
                <svg-icon icon="heroicons-outline:refresh" class-name="button-icon"></svg-icon>
              </el-button>
              <el-button class="hvr-pop" size="mini">
                {{ i18nProfile("changeAvatarButton") }}
                <svg-icon icon="carbon:user-avatar-filled" class-name="button-icon"></svg-icon>
              </el-button>

              <el-button size="mini" type="warning" @click="showSecurityCard">
                {{ i18nProfile("securityButton") }}
                <svg-icon icon="ic:baseline-security" class-name="button-icon"></svg-icon>
              </el-button>
            </div>
          </div>
        </template>
        <div class="card-content">
          <el-avatar :src="profile.avatar" :size="256" alt="Avatar" fit="fill" shape="square"
                     class="hvr-pop">
          </el-avatar>
          <div class="info-contain">
            <el-descriptions border :column="4" direction="vertical" size="large">
              <el-descriptions-item :label="i18nProfile('username')" align="center">{{ profile.username }}
              </el-descriptions-item>
              <el-descriptions-item :label="i18nProfile('nickname')" align="center">{{ profile.nickname }}
              </el-descriptions-item>
              <el-descriptions-item :label="i18nProfile('gender')" align="center">
                <span v-if="profile.gender === 1">
                  {{ i18nGender("Male") }}
                </span>
                <span v-else>
                  {{ i18nGender("Female") }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item :label="i18nProfile('age')" align="center">
                {{ profile.age }}
              </el-descriptions-item>
              <el-descriptions-item :label="i18nProfile('mobile')" align="center">{{ profile.mobile }}
              </el-descriptions-item>
              <el-descriptions-item :label="i18nProfile('email')" align="center">{{ profile.email }}
              </el-descriptions-item>
              <el-descriptions-item :label="i18nProfile('lastLoginTime')" align="center">
                {{ moment(profile.lastLoginTime).format(dateFormat) }}
              </el-descriptions-item>
              <el-descriptions-item :label="i18nProfile('isAvailable')" align="center">
                <el-tag size="small" v-if="profile.isAvailable===1">
                  {{ i18nAccountStatus("available") }}
                </el-tag>
                <el-tag size="small" v-else type="danger">
                  {{ i18nAccountStatus("unavailable") }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

      </el-card>
      <transition-group name="editAnime">
        <el-card class="edit-card" v-if="editShow">
          <div class="card-content" style="flex-flow: column;">
            <div class="info-part">
              <svg-icon icon="icon-park:edit-name" class-name="title-icon" style="margin-right: 5px;"></svg-icon>
              <span class="part-title">{{ i18nProfile("basicCardTitle") }}</span>
              <el-form ref="formRef" label-width="120px" v-model="backup" class="edit-form">
                <el-form-item v-for="o in updateList" :label="i18nProfile(o)">
                  <el-input-number v-model="backup[o]" v-if="o==='age'" :min="0"></el-input-number>
                  <el-select v-else-if="o==='gender'" v-model="backup[o]">
                    <el-option v-for="i in genderOptions" :label="i.label" :value="i.value">
                    </el-option>
                  </el-select>
                  <el-input v-else v-model="backup[o]"></el-input>
                </el-form-item>
              </el-form>
              <div class="edit-button-contain">
                <el-button type="primary" size="mini" class="hvr-pop" @click="updateProfile">
                  {{ i18nProfile("updateProfile") }}
                  <svg-icon icon="icon-park:send-one" class-name="button-icon"></svg-icon>
                </el-button>
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="edit-card" v-if="securityShow">
          <template #header>
            <div class="card-header">
              <span>{{ i18nProfile("securityCardTitle") }}</span>
            </div>
          </template>
          <div class="card-content" style="flex-flow: column;">
            <div class="rp-part">
              <svg-icon icon="vs:id-badge-alt" class-name="title-icon" style="margin-right: 5px;"></svg-icon>
              <span class="part-title">
                {{i18nProfile('security.rpTitle')}}
              </span>
              <div class="rp-contain">
                <el-collapse v-model="rpVal">
                  <el-collapse-item name="role" :title="i18nProfile('security.roleTitle')">
                    <el-tag v-for="i in role" class="rp-tag">
                      {{i}}
                    </el-tag>
                  </el-collapse-item>
                  <el-collapse-item name="permission" :title="i18nProfile('security.permissionTitle')">
                    <el-tag v-for="i in permission" class="rp-tag">
                      {{i}}
                    </el-tag>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div class="info-part">
              <svg-icon icon="flat-color-icons:lock" class-name="title-icon" style="margin-right: 5px;"></svg-icon>
              <span class="part-title">
                {{i18nProfile('security.apTitle')}}
              </span>
              <div class="security-button-contain">
                <el-button type="warning" size="small" class="hvr-push" @click="showEditPassDialog">{{i18nProfile('security.changePasswordButton')}}</el-button>
                <el-button type="danger" size="small" class="hvr-push">更换密保</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </transition-group>

      <!-- TODO: add a validator for pass check  -->
      <el-dialog v-model="passEditShow" center>
        <el-form ref="passFormRef" label-width="100px" :model="passForm">
          <el-form-item :label="i18nProfile('security.oldPass')">
            <el-input v-model="passForm.oldPass" type="password"></el-input>
          </el-form-item>

          <el-form-item :label="i18nProfile('security.newPass')">
            <el-input v-model="passForm.newPass" type="password"></el-input>
          </el-form-item>

          <el-form-item :label="i18nProfile('security.confirm')">
            <el-input v-model="passForm.confirmPass" type="password"> </el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="info" @click="cancelEditPass">{{SysI18n('button.cancel')}}</el-button>
          <el-button type="primary" @click="confirmEditPass">{{SysI18n('button.confirm')}}</el-button>
        </template>
      </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { i18nProfile, i18nGender, i18nAccountStatus,SysI18n } from "@/utils/i18n";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { computed, reactive, ref, toRefs } from "vue";
import { IPassForm } from "@/views/Profile/types/types";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/store";
import moment from "moment";
import { profileUpdate,passwordUpdate } from "@/api";
import globalHooks from "@/utils/globalHooks";

const editShow = ref(false);
const securityShow = ref(false);
const passEditShow = ref(false);
const userStore = useUserStore();

const hooks = globalHooks()

let passForm: IPassForm = reactive<IPassForm>({
  confirmPass: "",
  newPass: "",
  oldPass: ""
});

let profile = computed(() => {
  return userStore.getInfo;
});

let backup = computed(() => {
  return reactive(JSON.parse(JSON.stringify(userStore.getInfo)));
});

const role = userStore.getRoles;
const permission = userStore.getPermissions;
const dateFormat = hooks.dateFormat
const genderOptions = hooks.genderOptions
const rpVal = ref('role')

const initPassForm = () => {
  passForm.newPass = passForm.confirmPass = passForm.password = "";
};

const cancelEditPass = (done: () => void) => {
  passEditShow.value = false;
  initPassForm();
};

const updateProfile = () => {
  profileUpdate(backup.value)
    .then(res => {
      ElMessage.success("更新成功");
      userStore.setInfo(backup.value);
    })
    .catch(err => {
      console.log(err);
    });
};

const confirmEditPass = () => {
  passwordUpdate(passForm)
  .then(res=>{
    ElMessage.success("Edit Complete");
    passEditShow.value = false;
  })
  .catch(err=>{
    console.log(err);
  })
};

const showEditCard = () => {
  editShow.value = !editShow.value;
};

const showSecurityCard = () => {
  securityShow.value = !securityShow.value;
};

const showEditPassDialog = () => {
  passEditShow.value = !passEditShow.value;
};

const updateList = ["nickname", "gender", "mobile", "email", "age", "introduce"];

const excludeList = ["isAvailable", "createdTime", "updateTime", "lastLoginTime", "avatar", "id", "username"];
const excludeInput = (o: string) => {
  return excludeList.indexOf(o) === -1;
};


</script>

<style scoped lang="scss">
@import "style/index";

</style>
