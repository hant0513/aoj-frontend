<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script lang="ts" setup>
import heighlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

const plugins = [
  gfm(),
  // Add more plugins here
  heighlight(),
];
interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style scope>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  /* 隐藏github广告图标 */
  display: none;
}
</style>
