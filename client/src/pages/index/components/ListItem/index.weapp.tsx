
import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { IFurniture } from "@/type";
import { MenuContext } from "../../context/MenuContext";

interface IItemProps {
  data: IFurniture;
}

const Item: React.FC<IItemProps> = props => {
  const { data } = props;
  const { action } = React.useContext(MenuContext);

  const getPrice = () => {
    return `￥${data.price}`;
  };

  return (
    <View key={data._id} className="item">
      <Image
        className="img"
        mode="widthFix"
        src={data.imgSrc as string}
      ></Image>
      <View className="title">{data.title}</View>
      <View className="price">{getPrice()}</View>
      <View className="action">
        {data.number as number > 0 && (
          <>
            <View
              onClick={() => action?.sub(data._id || "")}
              className="button-icon-sub"
            >
              <View className="button-icon-sub-bg">
                <View className="at-icon at-icon-subtract"></View>
              </View>
            </View>
            <View className="text">{data.number}</View>
          </>
        )}
        <View onClick={() => action?.plus(data._id || "")} className="button-icon-add">
          <View className="button-icon-add-bg">
            <View className="at-icon at-icon-add"></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Item;