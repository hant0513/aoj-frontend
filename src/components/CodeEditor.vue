<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>
<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { ref, onMounted, withDefaults, defineProps, toRaw } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();

/**
 * 定义组件类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件赋值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "public class Main {}",
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
      scale: 5,
    },
    readOnly: false,
    colorDecorators: true, //颜色装饰器
    theme: "vs-dark",
  });
  //编辑 监听代码器变化
  codeEditor.value.onDidChangeModelContent(() => {
    //读写值的时候，要使用 toRaw() 的语法实例
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped>
.code-editor {
  height: 400px;
}
</style>
