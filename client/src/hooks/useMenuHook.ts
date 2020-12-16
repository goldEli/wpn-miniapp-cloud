import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { IMenu } from "../type";
type PIMenu = Partial<IMenu>
export default function (): { 
  list: PIMenu[], loading: boolean, add: () => void, refresh: () => void 
} {
  const [list, setList] = React.useState<PIMenu[]>([])
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

  const add = () => {
    setList(prev => {
      return [
        ...prev,
        {
          index: 1,
        }
      ]
    })
  }

  const refresh = () => {

  }

  return { list, loading, add, refresh }
}