<template>
  <div id="userLoginView">
    <h2>欢迎登录</h2>
    <a-form
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width="true"
      style="max-width: 480px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" tooltip="密码不少于 8 位">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
    <a-form-item>
      <a-button html-type="submit" @click="doRegister">注册</a-button>
    </a-form-item>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { UserControllerService } from "../../../generated/services/UserControllerService";
import { UserLoginRequest } from "../../../generated/models/UserLoginRequest";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest); //as 规划格式的校验
/**
 * 提交表单
 */
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  //alert(JSON.stringify(form));
  //实现登录
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    //登录成功后，修改全局用户状态
    //让前端再去请求一下 getLoginUser
    await store.dispatch("user/getLoginUser");
    //跳转到主页
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    Message.error("登录失败:" + res.message);
  }
};
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>
