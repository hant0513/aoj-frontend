<template>
  <a-row id="globalHeader" style="margin-bottom: 16px" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img src="../assets/logo-aoj.png" alt="" class="logo" />
            <div class="logo-name">AOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in routes" :key="item.path">{{
          item.name
        }}</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter, stringifyQuery } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

//获取当前存取的全部信息
const store = useStore();
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "hant",
    role: "admin",
  });
}, 3000);
// 获取当前页面的路由对象。
const router = useRouter();

//响应式变量
const selectedKeys = ref("/"); //默认主页

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

//处理菜单点击的函数，接收一个字符串参数 key。
const doMenuClick = (key: string) => {
  router.push({
    //进行路由导航
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
}
.logo {
  height: 48px;
}
.logo-name {
  text-align: center;
  color: black;
}
</style>
