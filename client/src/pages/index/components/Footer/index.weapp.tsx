import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
export default class Footer extends Component {
  componentWillMount() { }
  componentDidMount() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  render() {
    return (
      <View className='footer'>
        <view className="inner">
          <view className="price">￥123元</view>
          <view className="button">选好了，发给老板</view>
        </view>
      </View>
    )
  }
}