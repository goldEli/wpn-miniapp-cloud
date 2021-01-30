import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.less";

interface ITitleProps {
  title: string;
}

const Title: React.FC<ITitleProps> = props => {
  return (
    <View className="wme-title">
      <Text className="text">{props.title}</Text>
    </View>
  );
};

export default Title;
