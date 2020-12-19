import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import "./index.less";

interface IShowOrderProps {
  text: string
}

const ShowOrder: React.FC<IShowOrderProps> = (props) => {
  return (
    <View className="wme-order"><Text>{props.text}</Text></View>
  )
}

export default ShowOrder