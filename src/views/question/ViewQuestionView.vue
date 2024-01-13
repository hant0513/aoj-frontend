<template>
  <div id="viewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="title">
          <a-tab-pane key="title" title="题目">
            <a-card v-if="question" :title="question.title">
              <div>
                <a-descriptions
                  title="判题信息:"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig?.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig?.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig?.stackLimit ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>
              </div>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) in question.tags"
                    :key="index"
                    color="blue"
                    >{{ tag }}</a-tag
                  >
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论区" disabled>
            评论区
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解"> 暂时无法查看 </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12">
        <a-from :mode="form" layout="inline">
          <a-from-item>
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>java</a-option>
            </a-select>
          </a-from-item>
        </a-from>
        <CodeEditor
          :value="(form.code as string)"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交代码</a-button
        ></a-col
      >
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import {
  QuestionVO,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
} from "../../../generated";
import { ref, withDefaults, defineProps, onMounted } from "vue";
import { Message } from "@arco-design/web-vue/";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const question = ref<QuestionVO>();
interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "", //默认值
});

/**
 * 异步请求数据
 */
const loadData = async () => {
  //传递id
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    Message.error("加载失败" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "",
  code: "",
});

/**
 * 提交代码的函数
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    Message.success("提交成功");
  } else {
    Message.error("提交失败" + res.message);
  }
};

const changeCode = (value: string) => {
  form.value.code = value;
};

/**
 * 页面加载时，请求后端数据
 */
onMounted(() => {
  loadData();
});
</script>
<style>
#viewQuestionsView {
  max-width: 1400px;
  margin: 0 auto;
}
/* 调整标签距离 */
#viewQuestionsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
