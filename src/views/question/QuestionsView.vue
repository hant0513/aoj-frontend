<template>
  <div id="questionsView">
    <h2>查看题目</h2>

    <!-- 搜索表单 -->
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="标题" style="min-width: 280px">
        <a-input v-model="searchParams.title" placeholder="输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 280px">
        <a-input-tag v-model="searchParams.tags" placeholder="输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch"> 搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider style="height: 0px"></a-divider>

    <a-table
      :columns="columns"
      :data="datalist"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <span wrap>
          <a-tag
            v-for="(tag, index) in record.tags"
            :key="index"
            color="blue"
            >{{ tag }}</a-tag
          >
        </span>
      </template>

      <template #acceptedRate="{ record }">
        <a-space>
          {{
            `${
              record.submitNum ? record.acceptedNum / record.submitNum : "0"
            } % (${record.acceptedNum}/${record.submitNum})`
          }}</a-space
        >
      </template>

      <template #createTime="{ record }">
        <a-space>
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </a-space>
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button @click="toQuestionPage(record)" type="primary"
            >做题</a-button
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from "vue";
import {
  QuestionControllerService,
  Question,
  QuestionQueryRequest,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

// 默认dataList 数据为空
const datalist = ref([]);
//总数据数
const total = ref(0);
//默认查询条件
const searchParams = ref<QuestionQueryRequest>({
  title: "", //默认空字符串
  tags: [], //空数组
  current: 1,
  pageSize: 5,
});

/**
 * 异步请求数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    datalist.value = res.data.records; //分页获取
    total.value = res.data.total; //数据总数
  } else {
    Message.error("加载失败" + res.message);
  }
};

/**
 *
 * @param page 分页
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value, //获取之前的搜索值
    current: page, //覆盖 current
  };
};

//监听下面的函数，参数发生改变，就会重新执行
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求后端数据
 */
onMounted(() => {
  loadData();
});

const router = useRouter();

/**
 *
 * @param question 跳转到做题页面
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 搜索
 */
const doSearch = () => {
  searchParams.value = {
    //重置搜索条件
    ...searchParams.value,
    current: 1,
  };
  loadData();
};

/**
 * 行：从后端数据获取（dataList）
 * 列：自定义
 */
const columns = [
  {
    title: "i题号",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "题目名",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "详情",
    slotName: "optional",
  },
];
</script>
<style>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
