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
  const model = db.collection("menu");

  switch (event.anction) {
    case "getAll":
      return await model.get();
    case "add":
      return await model.add({
        data,
      });
    case "delete":
      return await model.where({ _id: data._id }).remove();
    case "update":
      return await model.where({ _id: data._id }).add({
        data,
      });
    default:
      break;
  }
};
