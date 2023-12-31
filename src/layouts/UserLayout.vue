<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space
          ><img src="../assets/logo-aoj.png" alt="" class="logo" />
        </a-space>
        <div>AOJ</div>
      </a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
      <a-layout-footer class="footer">@By hant</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("../assets/bg1.jpg") no-repeat;
  background-size: 100%;
}
#userLayout .header {
  margin-top: 16px;
  margin-bottom: 16px;
}
#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}
#userLayout .logo {
  height: 64px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky; /* 绝对定位：固定至底部 */
  bottom: 0;
  /* 撑满整个底部区域 */
  left: 0;
  right: 0;

  text-align: center; /* 文字居中 */
}
</style>

<script>
export default {
  components: {},
};
</script>
