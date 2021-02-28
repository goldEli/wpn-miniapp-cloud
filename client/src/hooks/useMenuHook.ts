import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { IFurniture, IMaterial } from "../type";
import { http } from "@/utils";
import { useMaterialList } from "@/hooks/useMaterialList";

// export interface IMenuAction {
//   add: () => void;
//   refresh: () => void;
//   update: (data: IFurniture) => void;
//   deleteItem: (_id: string) => void;
//   plus: (_id: string) => void;
//   sub: (_id: string) => void;
//   selectMaterial: (name: string) => void;
// }

export default function() {
  const [list, setList] = React.useState<IFurniture[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { materialList, selectMaterial, initMaterialist } = useMaterialList();

  useEffect(() => {
    getData();
  }, []);

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
  const changeNumber = (_id: string, number: number) => {
    setList(prev => {
      return prev.map(item => {
        if (item._id === _id) {
          return { ...item, number };
        }
        return item;
      });
    });
  };

  return {
    list,
    loading,
    materialList,
    action: { plus, sub, selectMaterial, changeNumber }
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
