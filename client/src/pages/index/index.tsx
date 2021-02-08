import React, { Component } from "react";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import "./index.less";
import { MenuContextProvider } from "./context/MenuContext";
import MaterialFilterBtn from "./components/MaterialFilterBtn";

interface IIndexProps {}

const Index: React.FC<IIndexProps> = props => {
  useShareAppMessage(res => {
    return {
      title: "艾菲特家私立志于做品质高，价格实惠的产品。",
      path: "pages/index/index",
      imageUrl:
        "https://wx3.sinaimg.cn/mw690/671cf50fgy1gnf9f0r6jvj20aa08bweo.jpg"
    };
  });
  return (
    <MenuContextProvider>
      <View className="wme-index">
        <MaterialFilterBtn />
        <Content />
        <Footer />
      </View>
    </MenuContextProvider>
  );
};

Index.enableShareAppMessage = true;
export default Index;
