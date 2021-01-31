import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {AtButton } from "taro-ui";
import Item from "./components/Item";
import "./index.less";

interface IFurnitureMngmtProps {}

const FurnitureMngmt: React.FC<IFurnitureMngmtProps> = props => {
  const id = getCurrentInstance().router?.params?.id || "";
  return (
    <View className="wme-forniture-mngmt">
      <AtButton type="primary" >新增</AtButton>
      <Item />
    </View>
  );
};

export default FurnitureMngmt;
