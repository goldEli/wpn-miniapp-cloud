import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTag } from "taro-ui";
import { MenuContext } from "@/pages/index/context/MenuContext";

interface IMaterialFilterBtnProps {}

const MaterialFilterBtn: React.FC<IMaterialFilterBtnProps> = props => {
  const { materialList, action } = React.useContext(MenuContext);

  const selectMaterial = (name: string) => {
    action?.selectMaterial(name);
  };

  return (
    <View className="filter-box">
      {materialList?.map(item => {
        return (
          <View key={item.name} className="tag-box">
            <AtTag
              type="primary"
              onClick={() => selectMaterial(item.name)}
              active={item.active}
              circle
            >
              {item.name}
            </AtTag>
          </View>
        );
      })}
    </View>
  );
};

export default MaterialFilterBtn;
