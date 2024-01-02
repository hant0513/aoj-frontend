<template>
  <div id="addQuestionView">
    <a-form :model="form" :layout="layout">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题..." />
      </a-form-item>

      <a-form-item field="answer" label="答案">
        <MdEditor></MdEditor>
      </a-form-item>

      <a-form-item field="content" label="题目内容">
        <MdEditor></MdEditor>
      </a-form-item>

      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请输入标签" all-clear />
      </a-form-item>

      <!-- 嵌套数据 -->
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              mode="button"
              size="large"
              placeholder="请输入消耗时间"
              min="0"
            />
          </a-form-item>

          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              mode="button"
              size="large"
              placeholder="请内存限制"
              min="0"
            />
          </a-form-item>

          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              mode="button"
              size="large"
              placeholder="堆栈限制"
              min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <!-- 动态表单 -->
      <a-form-item label="测试用例" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :label="`测试用例${index}`"
          :key="index"
        >
          <a-form-item
            :field="`form.judgeCase[${index}].input`"
            :label="`输入用例-${index}`"
            :key="index"
          >
            <a-input
              v-model="judgeCaseItem.input"
              placeholder="请输入测试用例"
            />
          </a-form-item>
          <a-form-item
            :field="`form.judgeCase[${index}].output`"
            :label="`输出用例-${index}`"
            :key="index"
          >
            <a-input
              v-model="judgeCaseItem.output"
              placeholder="请输出测试用例"
            />
          </a-form-item>
          <a-button @click="handleDelete(index)" :style="{ marginLeft: '10px' }"
            >Delete</a-button
          >
        </a-form-item>
        <div>
          <a-button @click="handleAdd">新增用例</a-button>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button>Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";

//定义响应式变量  from 表单的数据
const form = reactive({
  title: "",
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: [],
});

/**
 * 新增测试用例
 */
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
/**
 * 删除测试用例
 */
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style></style>
