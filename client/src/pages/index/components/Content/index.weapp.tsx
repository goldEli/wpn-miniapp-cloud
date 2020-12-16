import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import "taro-ui/dist/style/components/icon.scss"
import { IMenu } from "../../../../type"
import Skeletons from "../../../../components/skeletons/index.skeletions"

interface IContentProps {

}

const Content: React.FC<IContentProps> = (props) => {
  const [list, setList] = React.useState<IMenu[]>([])
  useEffect(() => {
    Taro.cloud
      .callFunction({
        name: "menu",
        data: {
          action: "getAll"
        }
      })
      .then((res: any) => {
        console.log(res)
        const { result } = res
        const { data } = result || {}
        if (data instanceof Array) {
          setList(data)
        }
      })

  }, [])
  const goToLogin = () => {
    Taro.redirectTo({
      url: '/pages/login/login'
    })
  }
  return (
    <>
      {/* <Skeletons /> */}
      <ScrollView
        scrollY
        scrollWithAnimation
        className="content"
      >
        {/* <View className="content"> */}
        {
          list.map((item, idx) => (
            <View key={item._id} className="item">
              <Image onLongPress={goToLogin} className="img" mode="widthFix" src={item.imgSrc}></Image>
              <View className="title">{item.title}</View>
              <View className="price">{`￥${item.price}/${item.unit}${item.netUnit ? '/' + item.net + item.netUnit : ""}`}</View>
              <View className="action">
                <View className="button-icon-sub">
                  <View className='at-icon at-icon-subtract'></View>
                </View>
                <View className="text">
                  0
                  </View>
                <View className="button-icon-add">
                  <View className='at-icon at-icon-add'></View>
                </View>
              </View>
            </View>
          ))
        }
        {/* </View> */}
      </ScrollView>
    </>
  )
}


export default Content


