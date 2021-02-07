import React, { Component } from "react";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import "./index.less";
import { MenuContextProvider } from "./context/MenuContext";
import { Picker } from "@tarojs/components";
import { AtList, AtListItem, AtTag } from "taro-ui";

interface IIndexProps {}

const Index: React.FC<IIndexProps> = props => {
  useShareAppMessage(res => {
    return {
      title: "艾菲特家私，品质典范。",
      path: "pages/index/index",
      imageUrl:
        "https://wx3.sinaimg.cn/mw690/671cf50fgy1gnf9f0r6jvj20aa08bweo.jpg"
    };
  });
  return (
    <MenuContextProvider>
      <View className="wme-index">
        <View className="tag-box">
          <Picker
            mode="selector"
            range={['火烧石', '大理石', '玻璃', '岩板', "金刚石", "石木面"]}
            onChange={() => {}}
          >
           <AtTag type='primary' circle>材质(全部)</AtTag>
          </Picker>
        </View>
        <Content />
        <Footer />
      </View>
    </MenuContextProvider>
  );
};

Index.enableShareAppMessage = true;
export default Index;
