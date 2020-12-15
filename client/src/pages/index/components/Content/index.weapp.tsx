import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtIcon } from "taro-ui";
import "taro-ui/dist/style/components/icon.scss"

interface IContentProps {
  list?: {
    id: string,
    index: number,
    price: number,
    unit: string,
    net?: number,
    netUnit?: string,
    title: string,
    img: string,
  }[]
}

const Content: React.FC<IContentProps> = (props) => {
  return (
    <ScrollView
      scrollY
      scrollWithAnimation
    >
      <View className="content">
        {
          props?.list?.map((item, idx) => (
            <View key={item.id} className="item">
              <Image className="img" mode="widthFix" src={item.img}></Image>
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
      title: "羊肉串",
      price: 15,
      unit: "串",
      net: 200,
      netUnit: "g",
      index: 1,
      id: "1",
      img: "https://wx4.sinaimg.cn/mw690/671cf50fgy1gloqtxr025j20500500sm.jpg",
    },
    {
      title: "牛肉串",
      price: 25,
      unit: "串",
      index: 2,
      id: "2",
      img: "https://wx4.sinaimg.cn/mw690/671cf50fgy1gloqtxr025j20500500sm.jpg",
    }
  ]
}

export default Content


