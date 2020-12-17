import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View} from '@tarojs/components'
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import './index.less'

// import Login from '../../components/login/index'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { 
    console.log(123)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
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
}
