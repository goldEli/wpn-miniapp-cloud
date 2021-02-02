import React, { Component } from "react";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import "./index.less";
import { MenuContextProvider } from "./context/MenuContext";

interface IIndexProps {
}

const Index: React.FC<IIndexProps> = props => {
  useShareAppMessage(res => {
    return {
      title: "点击进入",
      path: "pages/index/index"
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

Index.enableShareAppMessage = true;
export default Index;
