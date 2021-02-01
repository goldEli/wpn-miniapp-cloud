import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Item from "./components/Item";
import "./index.less";
import useFurnitureList from "@/hooks/useFurnitureList";

interface IFurnitureMngmtProps {}

const FurnitureMngmt: React.FC<IFurnitureMngmtProps> = props => {
  const id = getCurrentInstance().router?.params?.id || "3b020ca36014d640019bf0e55a2aa37c";
  const { refresh, furnitureList } = useFurnitureList();
  React.useEffect(() => {
    console.log(id)
    if (!id) return;
    refresh(id);
  }, [id]);
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
