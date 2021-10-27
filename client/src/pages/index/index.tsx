import React, { Component } from "react";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import "./index.less";
import { MenuContextProvider } from "./context/MenuContext";

interface IIndexProps {}

const Index: React.FC<IIndexProps> = props => {
  useShareAppMessage(res => {
    return {
      title: "歪婆娘冷吃",
      path: "pages/index/index",
      imageUrl: "https://wx4.sinaimg.cn/mw2000/006coskkgy1gvttdird14j30m80m8my8.jpg"
    };
  });
  return (
    <MenuContextProvider>
      <View className="wme-index">
        <Content />
        <Footer />
      </View>
    </MenuContextProvider>
  );
};

// @ts-ignore
Index.enableShareAppMessage = true;
export default Index;
