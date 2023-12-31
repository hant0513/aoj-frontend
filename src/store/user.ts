import { ACCESS_ENUM } from "@/access/accessEnum.ts";
import { UserControllerService } from "./../../generated/services/UserControllerService";
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 真正实现登录时，改为 从远程获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        //登录成功
        console.log(res.data);
        commit("updateUser", res.data);
      } else {
        //登录 失败
        commit("updateUser", {
          ...state.loginUser, //之前的信息
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as StoreOptions<any>;
