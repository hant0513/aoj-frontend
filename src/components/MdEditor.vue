<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script lang="ts" setup>
import heighlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, defineProps, withDefaults } from "vue";

const plugins = [
  gfm(),
  // Add more plugins here
  heighlight(),
];
/**
 * 定义组件属性：
 *   这两个属性不再是内部维护的了，而是交给父级去控制内部的状态
 * 下面需要在父组件中去调用
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scope>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
