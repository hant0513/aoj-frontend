/**
 * 在权限管理中获取登录态
 */
import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";

//在跳转页面前
router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;

  //如果之前没有登录，自动登录
  if (!loginUser || !loginUser.userRole) {
    //加await 是为了等用户登录成功后，在执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  console.log("当前登录的用户信息=>", store.state.user.loginUser);

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  //要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没有登录，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果已经登录，但是权限不足，调转到无权限界面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
