import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import "./index.less"

interface IOrderProps { }

const a = `へ订单信息へ\n>鸡肉串：2x1 = 2\n牛肉：1x4 = 4\n羊肉串：1x32 = 32\n五花肉：1x3 = 3\n共计：41 元（不含运费）`

const Order: React.FC<IOrderProps> = (props) => {
  return (
    <View className="wme-order"><Text>{a}</Text></View>

  )
}

export default Order