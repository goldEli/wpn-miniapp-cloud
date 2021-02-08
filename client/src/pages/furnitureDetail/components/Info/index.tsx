import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";

interface IInfoProps {}

const Info: React.FC<IInfoProps> = props => {
  const note = getCurrentInstance().router?.params?.note as string;
  return (
    <View>
      {note?.split("\n").map(item => {
        return <View>{item}</View>;
      })}
    </View>
  );
};

export default Info;
