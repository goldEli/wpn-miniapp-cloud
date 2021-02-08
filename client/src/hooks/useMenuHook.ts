import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { IFurniture } from "../type";
import { http } from "@/utils";

export interface IMenuAction {
  add: () => void;
  refresh: () => void;
  update: (data: IFurniture) => void;
  deleteItem: (_id: string) => void;
}

export default function(): {
  list: IFurniture[];
  loading: boolean;
  action: IMenuAction;
} {
  const [list, setList] = React.useState<IFurniture[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshNum, setRefreshNum] = React.useState(1);

  useEffect(() => {
    getData();
  }, [refreshNum]);

  const getData = async () => {
    const data = await http("menu", {
      action: "getAll"
    });
    if (data instanceof Array) {
      data.sort((a, b) => a.index - b.index);
      setList(data);
      setLoading(false);
    }
  };

  const add = () => {
    setList(prev => {
      if (prev.some(item => !item._id)) return prev;
      return [
        ...prev,
        {
          index: 1,
          onSale: true
        }
      ];
    });
  };

  const deleteItem = async (_id: string) => {
    if (!_id) {
      setList(prev => {
        return prev.filter(item => item?._id);
      });
      return;
    }
    await http(
      "menu",
      {
        action: "delete",
        _id: _id
      },
      { sucMsg: "删除成功" }
    );

    refresh();
  };

  const update = async (data: IFurniture) => {
    if (data._id) {
      await http(
        "menu",
        {
          action: "update",
          _id: data._id,
          data: handleData(data)
        },
        {
          sucMsg: "修改成功"
        }
      );
      return;
    }
    await http(
      "menu",
      {
        action: "add",
        data: handleData(data)
      },
      {
        sucMsg: "修改成功"
      }
    );
    refresh();
  };

  const refresh = () => {
    setRefreshNum(prev => prev + 1);
  };

  return { list, loading, action: { add, refresh, update, deleteItem } };
}

function handleData(data: IFurniture) {
  const ret = { ...data };
  delete ret._id;
  for (let key in ret) {
    if (["price", "index", "net"].includes(key)) {
      ret[key] = parseFloat(ret[key]);
    }
  }
  return ret;
}
