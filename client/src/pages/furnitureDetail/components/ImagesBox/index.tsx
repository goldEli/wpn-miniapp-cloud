import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

interface IImageBoxProps {}

const ImagesBox: React.FC<IImageBoxProps> = props => {
  const imgSrc = getCurrentInstance().router?.params?.imgSrc as string;
  console.log({imgSrc})
  return (
    <View>
      {imgSrc?.split(",").map(item => {
        return <Image mode="widthFix" className="img" src={item} />;
      })}
    </View>
  );
};

export default ImagesBox;
