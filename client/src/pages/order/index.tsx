import React, { useEffect } from "react";
import Taro, { Config, getCurrentInstance } from "@tarojs/taro";
import { Button, View, Text } from "@tarojs/components";
import "./index.less";
import { IMenuWithNum } from "@/type";

interface IOrderProps {}

const Order: React.FC<IOrderProps> = props => {
  const [orderData, setOrderData] = React.useState<IMenuWithNum[]>([]);
  useEffect(() => {
    const text = getCurrentInstance().router?.params?.text || "";
    const data: IMenuWithNum[] = text ? JSON.parse(text) : [];
    setOrderData(
      data.map(item => {
        const total = parseFloat((item.number * (item.price || 0)).toFixed(2));
        return {
          ...item,
          total: total
        };
      })
    );
  }, []);

  const sum = orderData.reduce((prev, item) => prev + (item.total || 0), 0);

  return (
    <>
      <View className="wme-order">
        <View>へ订单信息へ</View>
        {orderData.map(item => {
          return (
            <View>
              {`${item.title}：${item.number}x${item.price} = ${item.total}`}
            </View>
          );
        })}
        <View>{`共计：${sum} 元`}</View>
      </View>
    </>
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

export default Order;
