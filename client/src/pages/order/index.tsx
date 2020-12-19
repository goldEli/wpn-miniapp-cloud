import React from 'react'
import Taro, { Config, getCurrentInstance } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import ShowOrder from "@/components/showOrder/index.weapp";

interface IOrderProps { }

const Order: React.FC<IOrderProps> = (props) => {
  return (
    <>
      <Button onClick={() => {
        Taro.redirectTo({
          url: '/pages/index/index',
        })
      }} size="mini">返回菜单</Button>
      <ShowOrder text={getCurrentInstance().router?.params?.text || ""}></ShowOrder>
    </>
  )
}

export default Order