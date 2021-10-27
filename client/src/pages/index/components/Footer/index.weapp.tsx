import React, { Component } from "react";
import Taro, { setClipboardData } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { MenuContext } from "@/pages/index/context/MenuContext";
import { IFurniture } from "@/type";
import { handlePrice } from "@/utils";

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = props => {
  const { list } = React.useContext(MenuContext);

  const sum = React.useMemo(() => {
    return list
      ?.reduce(
        (prev, item) =>
          prev + ((item?.number || 0) * (item.price as number) || 0),
        0
      )
      .toFixed(2);
  }, [list]);

  const numberOfProducts =
    React.useMemo(() => {
      return list?.reduce((prev, item) => prev + (item.number || 0), 0);
    }, [list]) || 0;

  const toOrderPage = () => {
    if (numberOfProducts <= 0) {
      Taro.showToast({
        title: "您还未选择任何商品，请先选择。",
        icon: "none",
        duration: 2000
      });
      return;
    }
    const data = filterData(list);

    let text = "~~~订单信息~~~\n";

    data.forEach(item => {
      text += `${item.title}：${item.number} x ${
        item.price
      } = ${handlePrice.mul(item.number, item.price)}元\n`;
    });

    text += `共计：${sum} 元（不含运费）`;

    setClipboardData({
      data: text,
      success: function(res) {
        // self.setData({copyTip:true}),
        Taro.showModal({
          title: "提示",
          content: "订单信息复制成功，去聊天窗口粘贴吧！",
          success: function(res) {
            if (res.confirm) {
              console.log("确定");
            } else if (res.cancel) {
              console.log("取消");
            }
          }
        });
      }
    });
  };

  return (
    <View className="footer">
      <View className="inner">
        <View onLongPress={goToLogin} className="price">{` ￥${sum} 元`}</View>
        <Button onClick={toOrderPage} className="button">
          选好了，点我
        </Button>
      </View>
    </View>
  );
};

export default Footer;
const filterData = (data: IFurniture[] = []) => {
  return data
    .filter(item => typeof item?.number === "number" && item?.number > 0)
    .map(item => ({
      title: item.title,
      number: item.number,
      price: item.price
    }));
};

const goToLogin = () => {
  Taro.redirectTo({
    url: "/pages/login/login"
  });
};
