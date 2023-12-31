/* eslint-disable @typescript-eslint/no-unused-vars */
//存储的状态信息，比如用户信息 loginUser
// const state = () => ({
//   loginUser: { userName: "未登录" },
// });

import { StoreOptions } from "vuex";

// //便捷获取一些变量的方法
// const getters = {};

// //修改状态变量，定义增删改查的方法
// //同步
// const mutations = {
//   updateUser(state, payload) {
//     //payload 外层传递参数，改变内部的状态
//     state.loginUser = payload;
//   },
// };

// //actions更新mutations,mutations更新变量
// //执行异步操作，并且触发mutation的更改。
// const actions = {
//   getLoginUser({ commit, state }, payload) {
//     commit("updateUser", { userName: "ant" });
//   },
// };
// const modules = {};

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      //userRole: ACCESS_ENUM.NOT_LOGIN,
      role: "noLogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      // 真正实现登录时，改为 从远程获取登录信息
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as StoreOptions<any>;
