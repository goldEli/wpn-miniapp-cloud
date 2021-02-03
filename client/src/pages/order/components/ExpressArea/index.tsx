import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtTextarea } from "taro-ui";
import { IExpress } from "@/type";
import { CHINESE_KEY } from "@/config/express";

interface IExpressionAreaProps {
  expressInfo: IExpress;
  onInputChange: (key: keyof IExpress, value: any) => void;
}

const ExpressArea: React.FC<IExpressionAreaProps> = props => {
  const { expressInfo, onInputChange } = props;
  return (
    <View>
      <AtInput
        title={CHINESE_KEY["name"]}
        name="name"
        type="text"
        placeholder={"请输入收货人名称"}
        value={expressInfo.name}
        onChange={value => onInputChange("name", value)}
      />
      <AtInput
        title={CHINESE_KEY["phone"]}
        name="phone"
        type="phone"
        placeholder={"请输入收货人电话"}
        value={expressInfo.phone}
        onChange={value => onInputChange("phone", value)}
      />
      <View className="form-textarea">
        <View className="label">{CHINESE_KEY["address"]}</View>
        <AtTextarea
          placeholder={"请输入收货人地址"}
          value={expressInfo.address}
          onChange={value => onInputChange("address", value)}
        />
      </View>
      <AtInput
        title={CHINESE_KEY["express"]}
        name="express"
        type="text"
        placeholder={"请输入货运部名称"}
        value={expressInfo.express}
        onChange={value => onInputChange("express", value)}
      />
      <AtInput
        title={CHINESE_KEY["expressPhone"]}
        name="expressPhone"
        type="phone"
        placeholder={"请输入货运部电话"}
        value={expressInfo.expressPhone}
        onChange={value => onInputChange("expressPhone", value)}
      />
    </View>
  );
};

export default ExpressArea;
