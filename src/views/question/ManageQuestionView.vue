<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题..." />
      </a-form-item>

      <a-form-item field="content" label="题目内容">
        <MdEditor
          :value="form.content"
          :handle-change="onContentChange"
        ></MdEditor>
      </a-form-item>

      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请输入标签" all-clear />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor
          :value="form.answer"
          :handle-change="onAnswerChange"
        ></MdEditor>
      </a-form-item>

      <!-- 嵌套数据 -->
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              mode="button"
              size="large"
              min="0"
              placeholder="请输入消耗时间"
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
          :key="index"
          no-style
          ><a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输出测试用例"
              />
            </a-form-item>
            <a-button
              status="danger"
              type="primary"
              @click="handleDelete(index)"
              style="margin-bottom: 12px; float: right"
              >删除</a-button
            >
          </a-space>
        </a-form-item>
        <div>
          <a-button @click="handleAdd" style="margin-top: 16px"
            >新增用例</a-button
          >
        </div>
      </a-form-item>

      <a-form-item>
        <a-button
          style="min-width: 240px"
          type="primary"
          status="success"
          @click="doSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";

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
 * 点击提交，发送请求
 */
const doSubmit = async () => {
  const res = await QuestionControllerService.addQuestionUsingPost(form);
  if (res.code === 0) {
    Message.success("创建成功");
  } else {
    Message.error("创建失败" + res.message);
  }
};

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

// @param v 为Editor 传值
const onContentChange = (v: string) => {
  form.content = v;
};
const onAnswerChange = (v: string) => {
  form.answer = v;
};
</script>

<style></style>
