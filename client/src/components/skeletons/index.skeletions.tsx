import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import "./index.less";

interface ISkeletionsProps { }

const Skeletions: React.FC<ISkeletionsProps> = (props) => {
  const [state, setState] = React.useState(Array(10).fill(1));


  return (
    <View className='order-skeletons'>
      {state.map(item => (
        <View className='order-item' key={item}>
          <View className={'skeletons left'}></View>
          <View className='center'>
            <View className={'skeletons title'}></View>
            <View className={'skeletons price'}></View>
            <View className={'skeletons time'}></View>
          </View>
          <View className={'skeletons pay'}>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Skeletions