import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtInput } from "taro-ui";

type IInputNumberProps = {
  handleChange: (key: string, value: unknown) => void;
} & React.HTMLProps<typeof AtInput>;

const InputNumber: React.FC<IInputNumberProps> = props => {
  return (
    <AtInput
      name={props.name as string}
      title={props.title}
      type="number"
      placeholder={props.placeholder}
      value={numberToString(props.value as number)}
      onChange={(value: string) =>
        props.handleChange(props.name as string, Number(value))
      }
    />
  );
};
const numberToString = (value: number | undefined) => {
  if (typeof value === "number" && !isNaN(value)) {
    return value + "";
  } else {
    return "";
  }
};

export default InputNumber;
