import React from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

interface IImageBoxProps {
  list: string[];
}

const ImageBox: React.FC<IImageBoxProps> = props => {
  return <View>
    {props.list.map(item => {
      return <Image mode="widthFix" className="img" src={item}/>
    })}
  </View>;
};

export default ImageBox;
