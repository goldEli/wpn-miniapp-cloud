import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import "taro-ui/dist/style/components/icon.scss"
import Skeletons from "../../../../components/skeletons/index.skeletions"
import useMenuHook from "../../../../hooks/useMenuHook";

interface IContentProps {

}

const Content: React.FC<IContentProps> = (props) => {
  const [list, loading] = useMenuHook()
  const goToLogin = () => {
    Taro.redirectTo({
      url: '/pages/login/login'
    })
  }
  return (
    <>
      <ScrollView
        scrollY
        scrollWithAnimation
        className="content"
      >
        {
          loading ? <Skeletons /> : list.map((item, idx) => (
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
      </ScrollView>
    </>
  )
}


export default Content


