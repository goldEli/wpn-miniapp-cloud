import React, { useEffect } from "react";
import { Button, View, Text } from "@tarojs/components";
import { AtSwipeAction, AtList, AtListItem, AtButton } from "taro-ui";
import "./index.less";
import Title from "@/components/Title";
import UpdateCategoryModal, { open } from "./components/UpdateCategoryModal";

interface ISettingProps {}
const options = [
  {
    key: "modify",
    text: "修改",
    style: {
      backgroundColor: "#6190E8"
    }
  },
  {
    key: "delete",
    text: "删除",
    style: {
      backgroundColor: "#FF4949"
    }
  }
];
const list = [
  { id: "1", name: "系列1" },
  { id: "2", name: "系列2" },
  { id: "3", name: "系列3" }
];

const Setting: React.FC<ISettingProps> = props => {
  const handleSwipeAction = (event: any) => {
    console.log(event.key);
  };
  return (
    <>
      <View className="wme-setting">
        <Title title="系列" />
        <AtButton onClick={open} type="primary">
          新增
        </AtButton>
        <AtList>
          {list.map(item => {
            return (
              <AtSwipeAction
                onClick={handleSwipeAction}
                key={item.id}
                autoClose
                options={options}
              >
                <AtListItem arrow="right" title={item.name} />
              </AtSwipeAction>
            );
          })}
        </AtList>
        <UpdateCategoryModal />
      </View>
    </>
  );
};

export default Setting;
