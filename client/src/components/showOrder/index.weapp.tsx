import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { MenuContext } from "@/pages/index/context/MenuContext";
import { IMenuWithNum } from "@/type";
import "./index.less";

interface IShowOrderProps {}

const ShowOrder: React.FC<IShowOrderProps> = props => {
  const { data } = React.useContext(MenuContext);

  const sum = React.useMemo(() => {
    return data?.reduce(
        (prev, item) => prev + (item.number * (item.price as number) || 0),
        0
      )
      .toFixed(2);
  }, [data]);

  const text = React.useMemo(() => {
    return getText(data, sum);
  }, [data, sum]);

  return (
    <View className="wme-order">
      <Text>{text}</Text>
    </View>
  );
};
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

export default ShowOrder;
