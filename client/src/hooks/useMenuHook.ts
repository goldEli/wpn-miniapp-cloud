import React, { useEffect } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { IMenu } from "../type";
type PIMenu = Partial<IMenu>

export interface IMenuAction {
  add: () => void,
  refresh: () => void,
  update: (data: IMenu) => void,
  deleteItem: (_id: string) => void
}

export default function (): {
  list: PIMenu[],
  loading: boolean,
  action: IMenuAction
} {
  const [list, setList] = React.useState<PIMenu[]>([])
  const [loading, setLoading] = React.useState(true)
  const [refreshNum, setRefreshNum] = React.useState(1)
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

  }, [refreshNum])

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

  const deleteItem = (_id: string) => {
    if (!_id) {
      setList(prev => {
        return prev.filter(item => item?._id)
      })
      return
    }
    Taro.cloud
      .callFunction({
        name: "menu",
        data: {
          action: "delete",
          _id: _id,
        }
      })
      .then((res: any) => {
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        refresh()
        // console.log(res)
      })
      .catch((error) => {
        Taro.showToast({
          title: error,
          icon: "none",
          duration: 2000
        })
      })

  }

  const update = (data: IMenu) => {
    if (data._id) {
      Taro.cloud
        .callFunction({
          name: "menu",
          data: {
            action: "update",
            _id: data._id,
            data: handleData(data)
          }
        })
        .then((res: any) => {
          Taro.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          // console.log(res)
        })
        .catch((error) => {
          Taro.showToast({
            title: error,
            icon: "none",
            duration: 2000
          })
        })
      return
    }
    Taro.cloud
      .callFunction({
        name: "menu",
        data: {
          action: "add",
          data
        }
      })
      .then((res: any) => {
        Taro.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        refresh()
        // console.log(res)
      })
      .catch((error) => {
        Taro.showToast({
          title: error,
          icon: "none",
          duration: 2000
        })
      })
  }

  const refresh = () => {
    setRefreshNum(prev => prev + 1)
  }

  return { list, loading, action: { add, refresh, update, deleteItem } }
}

function handleData(data: PIMenu) {
  const ret = { ...data }
  delete ret._id
  for (let key in ret) {
    if (["price", "index", "net"].includes(key)) {
      ret[key] = parseFloat(ret[key])
    }
  }
  return ret
}