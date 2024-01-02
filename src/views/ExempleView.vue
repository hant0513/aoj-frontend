<template>
  <div class="exempleView">
    <MdEditor :value="mdValue" :handle-change="onMdChange"></MdEditor>
    <CodeEditor :value="codeValue" :handle-change="onCodeChange"></CodeEditor>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref("dfe");
const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};
//编辑器
const mdValue = ref("");
const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};
</script>
