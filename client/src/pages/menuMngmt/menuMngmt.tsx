
import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Login from "../../components/login"
import './index.less'

interface IMenuMngmtProps { }

const MenuMngmt: React.FC<IMenuMngmtProps> = (props) => {
  return (
    <View>
      <Login />
    </View>
  )
}

export default MenuMngmt
