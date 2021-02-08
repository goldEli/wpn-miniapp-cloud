import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { IFurniture, IMaterial } from "../type";
import { http } from "@/utils";
import { useMaterialList } from "@/hooks/useMaterialList";

export interface IMenuAction {
  add: () => void;
  refresh: () => void;
  update: (data: IFurniture) => void;
  deleteItem: (_id: string) => void;
  plus: (_id: string) => void;
  sub: (_id: string) => void;
  selectMaterial: (name: string) => void;
}

export default function(): {
  list: IFurniture[];
  loading: boolean;
  materialList: IMaterial[];
  action: IMenuAction;
} {
  const [list, setList] = React.useState<IFurniture[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshNum, setRefreshNum] = React.useState(1);
  const { materialList, selectMaterial, initMaterialist } = useMaterialList();

  useEffect(() => {
    getData();
  }, [refreshNum]);

  const getData = async () => {
    const data = await http("menu", {
      action: "getAll"
    });
    if (data instanceof Array) {
      const d = data
        // .sort((a, b) => a.index - b.index)
        .filter(item => item.onSale)
        .map(item => ({ ...item, number: 0 }));
      setList(d);
      initMaterialist(d);
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

  const plus = (_id: string) => {
    setList(prev => {
      return prev.map(item => {
        if (item._id === _id) {
          return { ...item, number: (item.number || 0) + 1 };
        }
        return item;
      });
    });
  };
  const sub = (_id: string) => {
    setList(prev => {
      return prev.map(item => {
        if (item._id === _id && (item.number || 0) > 0) {
          return { ...item, number: (item.number || 0) - 1 };
        }
        return item;
      });
    });
  };

  return {
    list,
    loading,
    materialList,
    action: { add, refresh, update, deleteItem, plus, sub, selectMaterial }
  };
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
