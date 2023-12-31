<template>
  <a-row id="globalHeader" align="center" :wrap="false">
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
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "../access/accessEnum";

const store = useStore();
const loginUser = store.state.user.loginUser; //获取当前用户

//展示在菜单上的路由,过滤出需要展示的路由
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      //判断是否需要展示
      return false;
    }
    //根据权限过滤菜单
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

//获取当前存取的全部信息

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "hant",
    userRole: ACCESS_ENUM.ADMIN,
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
