
import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Item from "./components/item/index.weapp"
import { AtMessage, AtButton } from 'taro-ui'
import './index.less'
import useMenuHook from "@/hooks/useMenuHook"
import Skeletons from "@/components/skeletons/index.skeletions";

interface IMenuMngmtProps { }

const MenuMngmt: React.FC<IMenuMngmtProps> = (props) => {
  const { list, loading, action } = useMenuHook()

  return (
    <View className="wme-menu-mngmt">
      <AtMessage />

      {
        loading ? <Skeletons /> : list?.map(item => {
          return <Item action={action} key={item?._id} data={item} />
        })

      }
      <View className="add-button">
        {!loading && <AtButton onClick={action.add} type="secondary">新增</AtButton>}
      </View>
    </View>
  )
}

export default MenuMngmt
