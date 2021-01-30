import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { MenuContext } from "@/pages/index/context/MenuContext";
import { IMenuWithNum } from "@/type";

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = props => {
  const { data } = React.useContext(MenuContext);
  const sum = React.useMemo(() => {
    return data
      ?.reduce(
        (prev, item) => prev + (item.number * (item.price as number) || 0),
        0
      )
      .toFixed(2);
  }, [data]);

  const text = React.useMemo(() => {
    return getText(data, sum);
  }, [data, sum]);
  return (
    <View className="footer">
      <View className="inner">
        <View
          onLongPress={goToLogin}
          className="price"
        >{` ￥${sum} 元`}</View>
        <Button
          openType="share"
          data-sum={sum}
          data-text={text}
          className="button"
        >
          选好了，点我
        </Button>
      </View>
    </View>
  );
};

export default Footer;
const getText = (data: IMenuWithNum[] = [], sum: string = "0") => {
  let start = `へ订单信息へ\n`;
  let mid = "";
  let end = `共计：${sum} 元（不含运费）`;
  data.forEach(item => {
    if (item.number > 0) {
      mid += `${item.title}：${item.number}x${item.price} = ${(
        item.number * (item.price as number)
      ).toFixed(2)}\n`;
    }
  });

  let content = start + mid + end;
  return content;
};

const goToLogin = () => {
  Taro.redirectTo({
    url: "/pages/login/login"
  });
};
