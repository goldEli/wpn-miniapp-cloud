import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import Home from "./home";

export default class Index extends Component {
  state = {
    showOrder: false
  }


  onShareAppMessage(res) { //放在父组件上执行，子组件上不被执行！
    if (res.from === 'button') {
      this.setState({
        showOrder: true
      })
      // 来自页面内转发按钮
      console.log(res.target)
      const { sum, text } = res?.target?.dataset || {}
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
      <>
        {this.state.showOrder && <Button onClick={() => this.setState({ showOrder: false })} size="mini">返回菜单</Button>}
        <Home showOrder={this.state.showOrder} />
      </>
    )
  }
}