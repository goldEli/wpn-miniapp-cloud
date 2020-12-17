import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

interface IFooterProps { }

const Footer: React.FC<IFooterProps> = (props) => {
  return (
    <View className='footer'>
      <View className="inner">
        <View onLongPress={goToLogin} className="price">￥123元</View>
        <View className="button">选好了，发给老板</View>
      </View>
    </View>
  )
}

export default Footer

const goToLogin = () => {
  Taro.redirectTo({
    url: '/pages/login/login'
  })
}