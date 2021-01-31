import React, { useEffect } from "react";
import Taro, {
  Config,
  getCurrentInstance,
  useShareAppMessage
} from "@tarojs/taro";
import { Button, View, Text } from "@tarojs/components";
import { AtSwipeAction, AtList, AtListItem, AtButton } from "taro-ui";
import "./index.less";
import { IMenuWithNum } from "@/type";
import Title from "@/components/Title";

interface ISettingProps {}
const options = [
  {
    text: "修改",
    style: {
      backgroundColor: "#6190E8"
    }
  },
  {
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
  return (
    <>
      <View className="wme-setting">
        <Title title="系列" />
        <AtButton type="primary">新增</AtButton>
        <AtList>
          {list.map(item => {
            return (
              <AtSwipeAction
                key={item.id}
                autoClose
                options={options}
              >
                <AtListItem arrow='right' title={item.name} />
              </AtSwipeAction>
            );
          })}
        </AtList>
      </View>
    </>
  );
};

export default Setting;
