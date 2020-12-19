
import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Content from "./components/Content/index.weapp";
import Footer from "./components/Footer/index.weapp";
import useMenuHook from "@/hooks/useMenuHook";
import './index.less'
import { IMenuWithNum } from "@/type";
import { MenuContext } from "./MenuContext";
import ShowOrder from "@/components/showOrder/index.weapp"

interface IIndexProps {
  showOrder: boolean
}


const Index: React.FC<IIndexProps> = (props) => {
  const { list, loading } = useMenuHook()
  const [data, setData] = React.useState<IMenuWithNum[]>([])
  console.log(props)

  React.useEffect(() => {
    if (list) {
      setData(list.filter(item => item.onSale).map(item => ({ ...item, number: 0 })))
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
  const sum = data.reduce((prev, item) => prev + (item.number * (item.price as number) || 0), 0).toFixed(2)
  const getText = () => {
    let start = `へ订单信息へ\n`
    let mid = ""
    let end = `共计：${sum} 元（不含运费）`
    data.forEach(item => {
      if (item.number > 0) {
        mid += `${item.title}：${item.number}x${item.price} = ${(item.number * (item.price as number)).toFixed(2)}\n`
      }
    })

    let content = start + mid + end
    return content
  }

  const text = getText()

  return (
    <MenuContext.Provider value={{ data, loading, action }}>
      {
        props.showOrder ? <ShowOrder text={text} /> : (
          <View className='wme-index'>
            {/* content */}
            <Content />
            {/* footer */}
            <Footer sum={sum} text={text} />
            {/* <Button onClick={this.onShareAppMessage}>go management</Button> */}
          </View>
        )
      }
    </MenuContext.Provider>
  )
}

export default Index