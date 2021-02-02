import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import ImagesBox from "./components/ImagesBox";
import Info from "./components/Info";
import Title from "@/components/Title";
import "./index.less"

interface IFurnitureDetailProps {}

const FurnitureDetail: React.FC<IFurnitureDetailProps> = props => {
  return (
    <View className="wme-furniture-detail">
      <Title title="简介" />
      <Info />
      <View className="spacer" />
      <Title title="图片展示" />
      <ImagesBox />
    </View>
  );
};

export default FurnitureDetail;
