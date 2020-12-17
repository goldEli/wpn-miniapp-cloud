
import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Item from "./components/item"
import { AtMessage, AtButton } from 'taro-ui'
import './index.less'
import useMenuHook from "../../hooks/useMenuHook"
import Skeletons from "@/components/skeletons/index.skeletions";
import { IMenu } from "../../type";

interface IMenuMngmtProps { }

const MenuMngmt: React.FC<IMenuMngmtProps> = (props) => {
  const {list, loading, add, update} = useMenuHook()

  const handleChange = (data:IMenu) => {
    // update
    // if (data._id) {

    // } else {
    // // add
    // add(data)  
    // }
  }



  return (
    <View className="wme-menu-mngmt">
      <AtMessage />

      {
        loading ? <Skeletons /> : list?.map(item => {
          return <Item update={update} key={item?._id} data={item} />
        })

      }
      {!loading && <AtButton onClick={add} type="secondary">新增</AtButton>}
    </View>
  )
}

export default MenuMngmt
