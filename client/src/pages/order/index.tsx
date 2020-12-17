import React from 'react'
import Taro, { Config, getCurrentInstance } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import "./index.less"

interface IOrderProps { }

const Order: React.FC<IOrderProps> = (props) => {
  return (
    <View className="wme-order"><Text>{getCurrentInstance().router?.params?.text}</Text></View>

  )
}

export default Order