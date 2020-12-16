import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { IMenu } from "../../../../type/index";


interface IItemProps { }

const Item: React.FC<IItemProps> = (props) => {
  const [data, setData] = React.useState<IMenu>(
    { "_id": "c89bd61c5fd96834017231607dc74ba8", "unit": "kebab", "imgSrc": "https://wx4.sinaimg.cn/mw690/671cf50fgy1gloqtxr025j20500500sm.jpg", "index": 1.0, "net": 100.0, "netUnit": "g", "price": 5.0, "title": "fish" }
  )
  const onSubmit = (event) => {
    Taro.atMessage({
      'message': '修改成功',
      'type': "success",
    })
  }
  const onInputChange = (value, event) => {
    const name = event?.mpEvent?.currentTarget?.id
    if (!name) return
    if (data[name] === value) return
    console.log(name)
    setData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  return (
    <View className="item">
      <Image className="img" mode="widthFix" src={data.imgSrc}></Image>
      <AtInput
        name='imgSrc'
        title='图片地址'
        type='text'
        value={data.imgSrc}
        onChange={onInputChange}
      />
      <AtInput
        name='title'
        title='名称'
        type='text'
        value={data.title}
        onChange={onInputChange}
      />
      <AtInput
        name='price'
        title='价格'
        type="number"
        value={data.price.toString()}
        onChange={onInputChange}
      />
      <AtInput
        name='unit'
        title='单位'
        type="text"
        value={data.unit}
        onChange={onInputChange}
      />
      <AtInput
        name='net'
        title='净重'
        type="number"
        value={data.net?.toString()}
        onChange={onInputChange}
      />
      <AtInput
        name='netUnit'
        title='净重'
        type="text"
        value={data.netUnit}
        onChange={onInputChange}
      />
      <View className="button-box">
        <AtButton onClick={onSubmit} type="secondary">删除</AtButton>
        <AtButton onClick={onSubmit} type="primary">修改</AtButton>
      </View>
    </View>
  )
}

export default Item