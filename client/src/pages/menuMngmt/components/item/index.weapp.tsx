import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { IMenu } from "../../../../type/index";


interface IItemProps {
  data?: Partial<IMenu>,
  update: (data: IMenu) => void
}

const Item: React.FC<IItemProps> = (props) => {
  const [data, setData] = React.useState<Partial<IMenu>>({})

  React.useEffect(() => {
    if (props.data) {
      setData(props.data)
    }

  }, [props.data])

  const onSubmit = (event) => {
    console.log(data)
    if (["imgSrc", "index", "unit", "title", "price"].some(key => data[key] === void 0 || data[key] === "")) {

      Taro.atMessage({
        'message': '除净重和净重单位外都需要填写',
        'type': "error",
      })
      return
    }
    props.update(data as IMenu)
    // if (Object)
    // Taro.atMessage({
    //   'message': '修改成功',
    //   'type': "success",
    // })
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
      <Image className="img" mode="widthFix" src={data?.imgSrc}></Image>
      <AtInput
        name='index'
        title='展示的位置'
        type='number'
        value={data?.index?.toString()}
        onChange={onInputChange}
      />
      <AtInput
        name='imgSrc'
        title='图片地址'
        type='text'
        value={data?.imgSrc}
        onChange={onInputChange}
      />
      <AtInput
        name='title'
        title='名称'
        type='text'
        value={data?.title}
        onChange={onInputChange}
      />
      <AtInput
        name='price'
        title='价格'
        type="number"
        value={data?.price?.toString()}
        onChange={onInputChange}
      />
      <AtInput
        name='unit'
        title='单位'
        type="text"
        value={data?.unit}
        onChange={onInputChange}
      />
      <AtInput
        name='net'
        title='净重'
        type="number"
        value={data?.net?.toString()}
        onChange={onInputChange}
      />
      <AtInput
        name='netUnit'
        title='净重单位'
        type="text"
        value={data?.netUnit}
        onChange={onInputChange}
      />
      <View className="button-box">
        <AtButton onClick={onSubmit} type="secondary">删除</AtButton>
        <AtButton onClick={onSubmit} type="primary">修改</AtButton>
      </View>
    </View>
  )
}

Item.defaultProps = {
  data: {}
}

export default Item