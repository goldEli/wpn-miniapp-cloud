import React, { Component } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import "./index.less";
import { MenuContextProvider } from "./context/MenuContext";

interface IIndexProps {
  showOrder?: boolean;
}

const Index: React.FC<IIndexProps> = props => {
  return (
    <MenuContextProvider>
      <View className="wme-index">
        <Content />
        <Footer />
      </View>
    </MenuContextProvider>
  );
};

export default Index;
