<template>
  <div id="manageQuestionView">
    <h2>题目管理</h2>
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
            v-for="(tag, index) in JSON.parse(record.tags)"
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
import { ref, onMounted, watchEffect } from "vue";
import { QuestionControllerService, Question } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

// 默认dataList 数据为空
const datalist = ref([]);
//总数据数
const total = ref(0);
//默认查询条件
const searchParams = ref({
  current: 1,
  pageSize: 5,
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
    ellipsis: true,
  },

  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
    ellipsis: true,
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },

  // {
  //   title: "判题用例",
  //   dataIndex: "judgeCase",
  // },
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
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>
<style></style>
