import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtButton, AtSwitch, message, AtTextarea } from 'taro-ui'
import { IMenu } from "@/type/index";
import { IMenuAction } from "@/hooks/useMenuHook"


interface IItemProps {
  data?: Partial<IMenu>,
  action: IMenuAction
}

const Item: React.FC<IItemProps> = (props) => {
  const [data, setData] = React.useState<Partial<IMenu>>({})

  React.useEffect(() => {
    if (props.data) {
      setData({...props.data})
    }

  }, [props.data])

  const onSubmit = (data: any) => {
    if (["imgSrc", "index", "unit", "title", "price"].some(key => data[key] === void 0 || data[key] === "")) {

      Taro.atMessage({
        'message': '除净重和净重单位外都需要填写',
        'type': "error",
      })
      return
    }
    props.action.update(data)
  }
  const onInputChange = (value:any, name: string) => {
    if (!name) return
    if (data[name] === value) return
    setData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  return (
    <View className="item">
      <Image className="img" mode="widthFix" src={data?.imgSrc as string}></Image>
      <AtInput
        name={`index-${data._id}`}
        title='展示的位置'
        type='text'
        value={data?.index?.toString()}
        onChange={(value) => onInputChange(value, "index")}
      />
      <div></div>
      <AtTextarea
        name={`imgSrc-${data._id}`}
        title='图片地址'
        type='text'
        value={data?.imgSrc || ""}
        onChange={(value) => onInputChange(value, "imgSrc")}
      />
      <AtInput
        name={`title-${data._id}`}
        title='名称'
        type='text'
        value={data?.title}
        onChange={(value) => onInputChange(value, "title")}
      />
      <AtInput
        name={`price-${data._id}`}
        title='价格'
        type="text"
        value={data?.price?.toString()}
        onChange={(value) => onInputChange(value, "price")}
      />
      {/* <AtInput
        name={`unit-${data._id}`}
        title='单位'
        type="text"
        value={data?.unit}
        onChange={(value) => onInputChange(value, "unit")}
      />
      <AtInput
        name={`net-${data._id}`}
        title='净重'
        type="text"
        value={data?.net?.toString()}
        onChange={(value) => onInputChange(value, "net")}
      />
      <AtInput
        name={`netUnit-${data._id}`}
        title='净重单位'
        type="text"
        value={data?.netUnit}
        onChange={(value) => onInputChange(value, "netUnit")}
      /> */}
      <AtSwitch title='是否上架销售' checked={data.onSale} onChange={(value) => onInputChange(value, "onSale")} />

      <View className="button-box">
        <AtButton onClick={() => props.action.deleteItem(data?._id || "")} type="secondary">删除</AtButton>
        <AtButton onClick={() => onSubmit(data)} type="primary">修改</AtButton>
      </View>
    </View>
  )
}

Item.defaultProps = {
  data: {}
}

export default Item