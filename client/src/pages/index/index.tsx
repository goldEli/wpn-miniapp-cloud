import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import './index.less'

interface IIndexProps { }

const Index: React.FC<IIndexProps> = (props) => {
  return (
    <View className='wme-index'>
      {/* content */}
      <Content />
      {/* footer */}
      <Footer />
      {/* <Button onClick={this.onShareAppMessage}>go management</Button> */}
    </View>
  )
}

export default Index