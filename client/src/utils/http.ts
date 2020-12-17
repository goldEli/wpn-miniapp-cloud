import Taro from '@tarojs/taro'
import { reject } from 'lodash'
const http = (name: string, data: any = {}, options?: {
  sucMsg?: string
}) => {
  return new Promise((resolve, eject) => {
    Taro.cloud
      .callFunction({
        name,
        data
      })
      .then((res: any) => {
        options?.sucMsg && Taro.showToast({
          title: options.sucMsg,
          icon: 'success',
          duration: 2000
        })
        const { result } = res
        const { data } = result || {}
        resolve(data)
        // console.log(res)
      })
      .catch((error) => {
        Taro.showToast({
          title: error,
          icon: "none",
          duration: 2000
        })
        reject(error)
      })
      .finally(() => {

      })
  })

}

export default http