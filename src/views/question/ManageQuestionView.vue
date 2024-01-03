<template>
  <div id="manageQuestionView">
    <h2>题目管理</h2>
    <a-table
      :columns="columns"
      :data="datalist"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
      }"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button @click="doUpdate(record)" type="primary">修改</a-button>
          <a-button @click="doDelete(record)" status="danger"
            >删除</a-button
          ></a-space
        >
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { QuestionControllerService, Question } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

// 默认dataList 数据为空
const datalist = ref([]);
//总数据数
const total = ref(0);
//默认查询条件
const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
});

/**
 * 异步请求数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.listUserByPageUsingPost(
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
 * 页面加载时，请求后端数据
 */
onMounted(() => {
  loadData();
});

/**
 * 行：从后端数据获取（dataList）
 * 列：自定义
 */
const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },

  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
    ellipsis: true,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "用户",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

/**
 * 删除操作
 * @param question
 */
const doDelete = async (question: Question) => {
  //调用后端接口
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    Message.success("删除成功");
    //删除成功后，更新数据
    loadData();
  } else {
    Message.error("删除失败");
  }
};

//更新数据
//将创建题目页面 复用 为更新题目页面
//  只需要在原先路由后面带上id，就可以从后端读取数据，再把数据渲染到前端页面
const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    //用 query  ---URL后面的参数 ,不是params --动态路由的参数
    query: {
      id: question.id,
    },
  });
};
</script>
<style></style>
