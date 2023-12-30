<template>
  <div id="globalHeader">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
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
      <a-menu-item key="1">Home</a-menu-item>
      <a-menu-item key="2">Solution</a-menu-item>
      <a-menu-item key="3">Cloud Service</a-menu-item>
      <a-menu-item key="4">Cooperation</a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts"></script>

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
