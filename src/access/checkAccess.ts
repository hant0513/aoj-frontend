import ACCESS_ENUM from "@/access/accessEnum";
/**
 *
 * @param loginUser 当前登录用户
 * @param needAccess  所需要的权限
 * @returns
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前用户登录状态，如果没有loginUser，表示未登录
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  //不需要任何权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  //需要用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //如果用户没有登录，表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //如果需要的权限管理员
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //如果不为管理员，表示无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
