import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import List from "../List/index.weapp";
import Nav from "../Nav";

interface IContentProps {}

const Content: React.FC<IContentProps> = props => {
  return (
    <View className="content">
      <Nav />
      <List />
    </View>
  );
};

export default Content;
