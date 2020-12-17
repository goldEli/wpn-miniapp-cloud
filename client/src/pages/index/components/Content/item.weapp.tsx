import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IMenu } from "@/type";

interface IItemProps {
  data: Partial<IMenu>
}

const Item: React.FC<IItemProps> = (props) => {
  const { data } = props
  const goToLogin = () => {
    Taro.redirectTo({
      url: '/pages/login/login'
    })
  }
  return (
    <View key={data._id} className="item">
      <Image onLongPress={goToLogin} className="img" mode="widthFix" src={data.imgSrc as string}></Image>
      <View className="title">{data.title}</View>
      <View className="price">{`￥${data.price}/${data.unit}${data.netUnit ? '/' + data.net + data.netUnit : ""}`}</View>
      <View className="action">
        <View className="button-icon-sub">
          <View className='at-icon at-icon-subtract'></View>
        </View>
        <View className="text">
          0
        </View>
        <View className="button-icon-add">
          <View className='at-icon at-icon-add'></View>
        </View>
      </View>
    </View>
  )
}

export default Item