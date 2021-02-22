import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button, Icon } from "@tarojs/components";
import { AtButton } from "taro-ui";

interface ISuccessPageProps {}

const SuccessPage: React.FC<ISuccessPageProps> = props => {
  const goBack = () => {
    Taro.navigateBack({
      delta: 1
    });
  };
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px"
        }}
      >
        <Icon size="60" type="success" />
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px"
        }}
      >
        <Text>订单信息已发送！</Text>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 32px"
        }}
      >
        <AtButton type="primary" full={false} onClick={goBack}>
          点我返回首页
        </AtButton>
      </View>
    </View>
  );
};

export default SuccessPage;
