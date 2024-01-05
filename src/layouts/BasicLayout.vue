<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"><GlobalHeader /></a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
      <a-layout-footer class="footer">@By hant</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}
#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
}
#basicLayout .content {
  /* background: linear-gradient(to right, #313c4e, #fff); */
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  background: #24bb9b;
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
import GlobalHeader from "@/components/GlobalHeader.vue";
export default {
  components: { GlobalHeader },
};
</script>
