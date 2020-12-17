import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { MenuContext } from "../../MenuContext"

interface IFooterProps { }

const Footer: React.FC<IFooterProps> = (props) => {
  const { data } = React.useContext(MenuContext) as any
  console.log(data)
  const sum = data.reduce((prev, item) => prev + (item.number * item.price || 0), 0)
  const getText = () => {
    let start = `へ订单信息へ\n`
    let mid = ""
    let end = `共计：${sum} 元（不含运费）`
    data.forEach(item => {
      if (item.number > 0) {
        mid += `${item.title}：${item.number}x${item.price} = ${item.number * item.price}\n`
      }
    })

    let content = start + mid + end
    console.log(content)
    return content
  }
  return (
    <View className='footer'>
      <View className="inner">
        <View onLongPress={goToLogin} className="price">{` ￥${sum} 元`}</View>
        <Button openType="share" data-text={getText()}  className="button">点我，发给老板</Button>
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