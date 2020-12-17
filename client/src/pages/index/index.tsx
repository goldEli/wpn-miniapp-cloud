import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import useMenuHook from "@/hooks/useMenuHook";
import './index.less'
import { IMenuWithNum } from "@/type";
import { MenuContext } from "./MenuContext";

interface IIndexProps { }


const Index: React.FC<IIndexProps> = (props) => {
  const { list, loading } = useMenuHook()
  const [data, setData] = React.useState<IMenuWithNum[]>([])

  React.useEffect(() => {
    if (list) {
      setData(list.map(item => ({ ...item, number: 0 })))
    }

  }, [list])

  const action = {
    plus: (_id: string) => {
      setData(prev => {
        return prev.map(item => {
          if (item._id === _id) {
            return { ...item, number: item.number + 1 }
          }
          return item
        })
      })
    },
    sub: (_id: string) => {
      setData(prev => {
        return prev.map(item => {
          if (item._id === _id && item.number > 0) {
            return { ...item, number: item.number - 1 }
          }
          return item
        })
      })

    }
  }

  return (
    <MenuContext.Provider value={{ data, loading, action }}>
      <View className='wme-index'>
        {/* content */}
        <Content />
        {/* footer */}
        <Footer />
        {/* <Button onClick={this.onShareAppMessage}>go management</Button> */}
      </View>
    </MenuContext.Provider>
  )
}

export default Index