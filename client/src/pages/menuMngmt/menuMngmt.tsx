
import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Item from "./components/item"
import { AtMessage, AtButton } from 'taro-ui'
import './index.less'

interface IMenuMngmtProps { }

const MenuMngmt: React.FC<IMenuMngmtProps> = (props) => {
  return (
    <View className="wme-menu-mngmt">
      <AtMessage />
      <Item />
      <Item />
      <AtButton type="secondary">新增</AtButton>
    </View>
  )
}

export default MenuMngmt
