import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
export default class Content extends Component {
  componentWillMount() { }
  componentDidMount() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  render() {
    return (
      <ScrollView
        scrollY
        scrollWithAnimation
      >
        <View className="content">
          {
            Array(20).fill(0).map((item, idx) => (
              <View key={idx.toString()} className="item">
                <Image className="img" mode="widthFix" src="https://wx4.sinaimg.cn/mw690/671cf50fgy1gloqtxr025j20500500sm.jpg"></Image>
                <View className="title">杨老师的房间阿里山啊收到了房间阿里山士大夫啊收到了附件</View>
                <View className="price">￥{idx}</View>
                <View className="action">click</View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}