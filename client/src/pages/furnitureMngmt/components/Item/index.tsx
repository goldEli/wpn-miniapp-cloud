import React from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtCard, AtDivider, AtSwitch, AtButton } from "taro-ui";
import ImageBox from "../ImageBox";
import "./index.less";
import { IFurniture } from "@/type";
import { open } from "../UpdateFurnitureModal";

interface IItemProps {
  data: IFurniture;
}

const Item: React.FC<IItemProps> = props => {
  const { data } = props;

  const edit = () => {
    open(data);
  };
  const note = `排序${data.index}，￥${data.price}，${
    data.onSale ? "已上架" : "未上架"
  }`;
  const imageSrcList = data.imgSrc?.split(",").filter(item => item) || [];
  return (
    <View className="furnitureMngomt-item">
      <AtCard onClick={edit} title={data.title} note={note}>
        <ImageBox list={imageSrcList} />
        {data.note?.split("\n").map(item => {
          return <View>{item}</View>;
        })}
      </AtCard>
    </View>
  );
};

export default Item;
