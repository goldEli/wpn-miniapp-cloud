import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { IMenu } from "../type";

export default function (): [IMenu[], boolean] {
  const [list, setList] = React.useState<IMenu[]>([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    Taro.cloud
      .callFunction({
        name: "menu",
        data: {
          action: "getAll"
        }
      })
      .then((res: any) => {
        const { result } = res
        const { data } = result || {}
        if (data instanceof Array) {
          setList(data)
          setLoading(false)
        }
      })

  }, [])

  return [list, loading]
}