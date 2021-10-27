import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtFab } from "taro-ui";
import Item from "./components/Item";
import "./index.less";
import useFurnitureList from "@/hooks/useFurnitureList";
import UpdateFurnitureModal, { open } from "./components/UpdateFurnitureModal";

interface IFurnitureMngmtProps {}

const FurnitureMngmt: React.FC<IFurnitureMngmtProps> = props => {
  const { furnitureList, add, deleteById, update } = useFurnitureList();

  const onAdd = () => {
    open();
  };

  return (
    <View className="wme-forniture-mngmt">
      <View
        onClick={onAdd}
        className="fixed-btn"
      >
        <AtFab>
          <Text className="at-fab__icon at-icon at-icon-add"></Text>
        </AtFab>
      </View>
      {furnitureList
        ?.sort((a, b) => (a.index || 0) - (b.index || 0))
        ?.map(item => {
          return <Item data={item} />;
        })}
      <UpdateFurnitureModal add={add} deleteById={deleteById} update={update} />
    </View>
  );
};

export default FurnitureMngmt;
