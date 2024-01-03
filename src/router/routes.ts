import NoAuthView from "@/views/NoAuth.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import { RouteRecordRaw } from "vue-router";
import ExempleViewVue from "@/views/ExempleView.vue";
import AdminView from "@/views/AdminView.vue";
import UserLayoutVue from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayoutVue,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "浏览题目",
    component: ExempleViewVue,
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },+
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
  },
  {
    path: "/hide",
    name: "隐藏题目",
    component: ExempleViewVue,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于我的",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
  },
];
