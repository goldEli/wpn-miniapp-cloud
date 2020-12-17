import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Home from "./home";

export default class Index extends Component {


  onShareAppMessage(res) { //放在父组件上执行，子组件上不被执行！
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      const {sum, text} = res?.target?.dataset || {}
      return {
        title: `我的订单(共计${sum}元)`,
        path: `pages/order/index?text=${text}`
      }
    }
    return {
      title: '点击进入菜单',
      path: 'pages/index/index'
    }
  }

  render() {
    return (
      <Home />
    )
  }
}