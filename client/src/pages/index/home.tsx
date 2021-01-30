import React, { Component } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import "./index.less";
import { MenuContextProvider } from "./context/MenuContext";
import ShowOrder from "@/components/showOrder/index.weapp";

interface IIndexProps {
  showOrder: boolean;
}

const Index: React.FC<IIndexProps> = props => {

  return (
    <MenuContextProvider>
      {props.showOrder ? (
        <ShowOrder />
      ) : (
        <View className="wme-index">
          <Content />
          <Footer />
        </View>
      )}
    </MenuContextProvider>
  );
};

export default Index;
