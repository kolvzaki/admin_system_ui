<template>
<div class="login-contain">
  <div class="login-box">
    <div class="logo-contain">
      <el-image :src="pics" fit="cover"/>
    </div>
    <div class="input-contain">

      <div class="title-contain">
        <span>System Admin</span>
      </div>

      <div class="form-contain">

        <div class="selector-contain">
          <el-radio-group  v-model="loginType">
            <el-radio-button label="Account" ></el-radio-button>
            <el-radio-button label="Mobile" ></el-radio-button>
            <el-radio-button label="Wechat" ></el-radio-button>
          </el-radio-group>
        </div>

        <transition-group name="loginAnime">
          <div class="userform" v-if="loginType==='Account'">
            <el-form v-model="accountForm" label-width="120px" label-position="right">
              <el-form-item label="Username" prop="username">
                <el-input v-model="accountForm.username" :suffix-icon="UserFilled">
                </el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input v-model="accountForm.password" type="password" :suffix-icon="Lock" />
              </el-form-item>
            </el-form>
          </div>

          <div class="userform" v-if="loginType === 'Mobile'">
            <el-form v-model="mobileForm" label-width="120px" label-position="right">
              <el-form-item label="Mobile">
                <el-input v-model="mobileForm.mobile" :suffix-icon="Cellphone"/>
              </el-form-item>
              <el-form-item label="Code">
                <el-input v-model="mobileForm.code" >
                  <template #suffix>
                    <el-button type="text" @click="getCodeByMobile">获取验证码</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="codeform" v-if="loginType==='Wechat'">
            <el-image :src="pics" fit="cover"></el-image>
            <p>微信扫码登录</p>
          </div>

          <div class="btnContain" v-if="loginType !== 'Wechat'">
            <el-button @click="login" type="primary">Enter</el-button>
          </div>

        </transition-group>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch } from "vue";
import {UserFilled,Lock,Cellphone} from '@element-plus/icons-vue'
import {ElMessage as message} from "element-plus";
import {useRouter} from "vue-router";
import { loginByForm } from "@/api/user";
import useUserStore from "@/store/modules/useUserStore";
import useAppStore from "@/store/modules/useAppStore";

const pics =   'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
const userStore = useUserStore()
const appStore = useAppStore()
const loginType = ref('Account')
const router = useRouter()

let accountForm = reactive<{
  username: string,
  password: string
}>({
  username:"",
  password:""
})

let mobileForm = reactive<{
  mobile:string,
  code:string
}>({
  mobile:"",
  code:""
})

function getCodeByMobile():void{
  message.success('success')
}

async function login(): Promise<void>{
  if (loginType.value === "Account"){
    await loginByForm(accountForm).then(res=>{
      console.log(res);
      const {data} = res
      if (data){
        router.push('/')
        userStore.setLoginInfo(data)
      }
      message.success("登录成功")

    }).catch(err=>{
      router.push('/login')
    })
  }
}

</script>

<style scoped lang="scss">
@import "src/assets/style/login.scss";

</style>
