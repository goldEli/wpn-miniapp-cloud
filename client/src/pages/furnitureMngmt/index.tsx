import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Item from "./components/Item";
import "./index.less";
import useFurnitureList from "@/hooks/useFurnitureList";

interface IFurnitureMngmtProps {}

const FurnitureMngmt: React.FC<IFurnitureMngmtProps> = props => {
  const { refresh, furnitureList } = useFurnitureList();
  React.useEffect(() => {
    const id = getCurrentInstance().router?.params?.id || "";
    console.log(id, 123)
    if (!id) return;
    refresh(id);
  }, []);
  return (
    <View className="wme-forniture-mngmt">
      <AtButton>新增</AtButton>
      {furnitureList.map(item => {
        return <Item data={item} />;
      })}
    </View>
  );
};

export default FurnitureMngmt;
