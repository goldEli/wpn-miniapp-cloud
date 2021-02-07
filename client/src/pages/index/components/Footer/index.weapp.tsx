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

  const text = JSON.stringify(filterData(data));

  const toOrderPage = () => {
    Taro.navigateTo({
      url: `/pages/order/index?text=${text}&fromHome=true`
    });
  };

  return (
    <View className="footer">
      <View className="inner">
        <View onLongPress={goToLogin} className="price">{` ￥${sum} 元`}</View>
        <Button
          // openType="share"

          onClick={toOrderPage}
          // data-sum={sum}
          // data-text={text}
          className="button"
        >
          选好了，点我
        </Button>
      </View>
    </View>
  );
};

export default Footer;
const filterData = (data: IMenuWithNum[] = []) => {
  return data
    .filter(item => item.number > 0)
    .map(item => ({
      title: item.title,
      number: item.number,
      price: item.price
    }));
};

const goToLogin = () => {
  Taro.navigateTo({
    url: "/pages/login/login"
  });
};
