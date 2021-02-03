import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtList, AtListItem, AtInput, AtButton, AtTextarea } from "taro-ui";
import { IExpress } from "@/type";

interface IExpressionAreaProps {
  editable: boolean;
  expressInfo: IExpress;
  onInputChange: (key: keyof IExpress, value: string) => void;
}

const ExpressArea: React.FC<IExpressionAreaProps> = props => {
  const { editable, expressInfo, onInputChange } = props;
  return (
    <View>
      <AtInput
        editable={editable}
        title="收货人名称"
        name="name"
        type="text"
        placeholder={"请输入收货人名称"}
        value={expressInfo.name}
        onChange={value => onInputChange("name", value)}
      />
      <AtInput
        editable={editable}
        title="收货人电话"
        name="phone"
        type="phone"
        placeholder={"请输入收货人电话"}
        value={expressInfo.phone}
        onChange={value => onInputChange("phone", value)}
      />
      <View className="form-textarea">
        <View className="label">收货人地址</View>
        <AtTextarea
          disabled={!editable}
          placeholder={"请输入收货人地址"}
          value={expressInfo.address}
          onChange={value => onInputChange("address", value)}
        />
      </View>
      <AtInput
        editable={editable}
        title="货运部"
        name="express"
        type="text"
        placeholder={"请输入货运部名称"}
        value={expressInfo.express}
        onChange={value => onInputChange("express", value)}
      />
      <AtInput
        editable={editable}
        title="货运部电话"
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
