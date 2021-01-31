import React from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtCard, AtTextarea, AtSwitch } from "taro-ui";
import ImageBox from "../ImageBox";

import Title from "@/components/Title";
interface IItemProps {}

const Item: React.FC<IItemProps> = props => {
  const edit = () => {
    console.log("edit")
  }
  const onChangeSwitch = () => {

  }
  return (
    <View className="furnitureMngomt-item">
      <AtCard onClick={edit} title="a系列茶几" note="排序1，￥3000">
        <ImageBox
          list={[
            "https://wx3.sinaimg.cn/mw690/671cf50fgy1glqy60o43jj203e03rmxg.jpg",
            "https://wx3.sinaimg.cn/mw690/671cf50fgy1glqy64jy84j203203rdg0.jpg"
          ]}
        />
        <View>
          规格：C-120(茶)1200*600*465
          \n配色大胆，符合现今大众审美。油漆符合环保要求，无刺激性气味，板材不易受潮变形，抽屉采用实木，质地耐磨。
        </View>
        <View>
          <AtSwitch title='是否上架' checked={true} onChange={onChangeSwitch} />
        </View>
      </AtCard>
    </View>
  );
};

export default Item;
