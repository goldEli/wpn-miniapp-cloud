import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Title from "@/components/Title";

interface IItemProps {}

const Item: React.FC<IItemProps> = props => {
  return <View>
    <Title title="a系列茶几" />
  </View>;
};

export default Item;
