import NoAuthView from "@/views/NoAuth.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import UserLayoutVue from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
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
    component: HomeView,
  },
  {
    path: "/hide",
    name: "隐藏题目",
    component: HomeView,
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
