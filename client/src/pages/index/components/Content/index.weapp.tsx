import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import "taro-ui/dist/style/components/icon.scss"
import Skeletons from "@/components/skeletons/index.skeletions"
// import useMenuHook from "@/hooks/useMenuHook";
import Item from "./item.weapp";
import { MenuContext } from "../../MenuContext"

interface IContentProps {

}

const Content: React.FC<IContentProps> = (props) => {
  // const { list, loading } = useMenuHook()
  const { data, loading } = React.useContext(MenuContext) as any
  return (
    <>
      <ScrollView
        scrollY
        scrollWithAnimation
        className="content"
      >
        {
          loading ? <Skeletons /> : data.map((item, idx) => (
            <Item data={item} />
          ))
        }
      </ScrollView>
    </>
  )
}


export default Content


