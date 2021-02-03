import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { IExpress } from "@/type";
import { CHINESE_KEY } from "@/config/express";

interface IExpressAreaReadOnlyProps {
  expressInfo: IExpress;
}

const ExpressAreaReadOnly: React.FC<IExpressAreaReadOnlyProps> = props => {
  return (
    <View>
      {Object.keys(props.expressInfo).map(key => {
        return (
          <View key={key}>
            <Text>{`${CHINESE_KEY[key]}: ${props.expressInfo[key] || "未填写"}`}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ExpressAreaReadOnly;
