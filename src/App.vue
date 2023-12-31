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
import { onMounted } from "vue";

/**
 * 全局初始化函数，有全局单词调用的代码，都可以写在这里
 */
const doInit = () => {
  console.log("AOJ");
};
onMounted(() => {
  doInit;
});
</script>
