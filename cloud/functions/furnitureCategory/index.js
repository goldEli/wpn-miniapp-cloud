// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext();
  const model = db.collection("furnitureCategory");
  const {data, _id} = event
  switch (event.action) {
    case "getAll":
      return await db.collection("furnitureCategory").get();
    case "add":
      return await model.add({
        data,
      });
    case "delete":
      return await model.where({ _id }).remove();
    case "update":
      return await model.where({ _id }).update({
        data,
      });
    default:
      break;
  }
};
