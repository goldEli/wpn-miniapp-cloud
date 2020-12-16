// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  switch (event.action) {
    case "checkUser":
      return await checkUser(event);

    default:
      return false;
  }
};

async function checkUser({name, pwd}) {
  const ret =  await db.collection('user').where({name, pwd}).count()
  if (ret.total > 0) {
    return {
      isUser: true,
      message: "登录成功"
    }
  } else {
    return {
      isUser: false,
      message: "账号密码错误"    
    }
  }
}
