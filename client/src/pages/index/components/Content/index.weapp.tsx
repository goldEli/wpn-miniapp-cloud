import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
export default class Content extends Component {
  componentWillMount() { }
  componentDidMount() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  render() {
    return (
      <View className='index'>
        Content
      </View>
    )
  }
}