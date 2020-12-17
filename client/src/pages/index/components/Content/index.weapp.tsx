import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import "taro-ui/dist/style/components/icon.scss"
import Skeletons from "@/components/skeletons/index.skeletions"
import useMenuHook from "@/hooks/useMenuHook";
import Item from "./item.weapp";

interface IContentProps {

}

const Content: React.FC<IContentProps> = (props) => {
  const { list, loading } = useMenuHook()
  return (
    <>
      <ScrollView
        scrollY
        scrollWithAnimation
        className="content"
      >
        {
          loading ? <Skeletons /> : list.map((item, idx) => (
            <Item data={item} />
          ))
        }
      </ScrollView>
    </>
  )
}


export default Content


