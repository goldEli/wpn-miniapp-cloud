import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, ScrollView, Button } from '@tarojs/components'
import "taro-ui/dist/style/components/icon.scss"

interface IContentProps {
  list?: {
    _id: string,
    index: number,
    price: number,
    unit: string,
    net?: number,
    netUnit?: string,
    title: string,
    imgSrc: string,
  }[]
}

const Content: React.FC<IContentProps> = (props) => {
  const goToLogin = () => {
    // Taro.cloud
    //   .callFunction({
    //     name: "login",
    //     data: {}
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
    Taro.redirectTo({
      url: '/pages/login/login'
    })
  }
  return (
    <ScrollView
      scrollY
      scrollWithAnimation
    >
      <View className="content">
        {
          props?.list?.map((item, idx) => (
            <View key={item._id} className="item">
              <Image onLongPress={goToLogin} className="img" mode="widthFix" src={item.imgSrc}></Image>
              <View className="title">{item.title}</View>
              <View className="price">{`￥${item.price}/${item.unit}${item.netUnit ? '/' + item.net + item.netUnit : ""}`}</View>
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
          ))
        }
      </View>
    </ScrollView>

  )
}

Content.defaultProps = {
  list: [
    {
      title: "fish",
      price: 15,
      unit: "kebab",
      net: 200,
      netUnit: "g",
      index: 1,
      _id: "1",
      imgSrc: "https://wx4.sinaimg.cn/mw690/671cf50fgy1gloqtxr025j20500500sm.jpg",
    },
  ]
}

export default Content


