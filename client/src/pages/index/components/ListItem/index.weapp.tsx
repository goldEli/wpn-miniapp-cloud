import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { IFurniture } from "@/type";
import { MenuContext } from "../../context/MenuContext";
import { open } from "../UpdateNumberModal";

interface IItemProps {
  data: IFurniture;
}

const Item: React.FC<IItemProps> = props => {
  const { data } = props;
  const { action } = React.useContext(MenuContext);

  const getPrice = () => {
    return `￥${data.price}`;
  };
  
  const changeNumber = (e: any) => {
    e.stopPropagation();
    open({ _id: data._id, number: data.number });
  };

  return (
    <View
      key={data._id}
      className="item"
    >
      <View className="img-box">
        <Image
          className="img"
          mode="aspectFill"
          src={data?.imgSrc || ""}
        ></Image>
      </View>
      <View className="title">{data.title}</View>
      <View className="price">
          <View className="price-num">{getPrice()}</View>
          <View className="price-des">{data.weight}</View>
          <View className="price-des">{`/${data.unit}`}</View>
      </View>
      <View className="action">
        {(data.number as number) > 0 && (
          <>
            <View
              onClick={(e: any) => {
                e.stopPropagation();
                action?.sub?.(data._id || "");
              }}
              className="button-icon-sub"
            >
              <View className="button-icon-sub-bg">
                <View className="at-icon at-icon-subtract"></View>
              </View>
            </View>
            <View onClick={changeNumber} className="text">
              {data.number}
            </View>
          </>
        )}
        <View
          onClick={(e: any) => {
            e.stopPropagation();
            action?.plus?.(data._id || "");
          }}
          className="button-icon-add"
        >
          <View className="button-icon-add-bg">
            <View className="at-icon at-icon-add"></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Item;
