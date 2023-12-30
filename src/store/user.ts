/* eslint-disable @typescript-eslint/no-unused-vars */
//存储的状态信息，比如用户信息 loginUser
const state = () => ({
  loginUser: { userName: "ant" },
});

//便捷获取一些变量的方法
const getters = {};

//修改状态变量，定义增删改查的方法
//同步
const mutations = {
  updateUser(state, payload) {
    //payload 外层传递参数，改变内部的状态
    state.loginUser = payload;
  },
};

//actions更新mutations,mutations更新变量
//执行异步操作，并且触发mutation的更改。
const actions = {};
const modules = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
