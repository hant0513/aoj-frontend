<template>
  <div id="app">
    <BasicLayout></BasicLayout>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import store from "./store";

const router = useRouter();

/**
 * 全局初始化函数，有全局单词调用的代码，都可以写在这里
 */
const doInit = () => {
  console.log("AOJ");
};
onMounted(() => {
  doInit;
});

router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
