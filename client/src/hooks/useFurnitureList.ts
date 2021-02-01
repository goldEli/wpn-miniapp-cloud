import React, { useEffect } from "react";
import { http } from "@/utils";
import { IFurniture, IFurnitureCategory } from "@/type";
import { setWifiList } from "@tarojs/taro";
const urlKey = "menu";

export default function useFurnitureList() {
  const [furnitureList, setFurnitureList] = React.useState<IFurniture[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [furnitureCategoryId, setFurnitureCategoryId] = React.useState("");

  // useEffect(() => {
  //   refresh();
  // }, []);
  const refresh = async (furnitureCategoryId: string) => {
    console.log("refresh", furnitureCategoryId);
    setFurnitureCategoryId(furnitureCategoryId);
    const data = await http(urlKey, {
      action: "getByFurnitureCategoryId",
      furnitureCategoryId
    });
    if (data instanceof Array) {
      data.sort((a, b) => a.index - b.index);
      setFurnitureList(data);
      setLoading(false);
    }
  };
  const add = async (data: IFurniture) => {
    await http(
      urlKey,
      {
        action: "add",
        data
      },
      {
        sucMsg: "新增成功"
      }
    );
    refresh(furnitureCategoryId);
  };

  const deleteById = async (_id: string) => {
    await http(
      urlKey,
      {
        action: "delete",
        _id: _id
      },
      { sucMsg: "删除成功" }
    );
    setFurnitureList(prev => {
      return prev.filter(item => item._id !== _id);
    });
    // refresh();
  };

  const update = async (_id: string, data: IFurniture) => {
    await http(
      urlKey,
      {
        action: "update",
        _id,
        data
      },
      {
        sucMsg: "修改成功"
      }
    );
    // refresh();
    setFurnitureList(prev => {
      return prev.map(item => {
        if (item._id === _id) {
          return {...item, ...data}
        }
        return item
      });
    });
  };

  return { furnitureList, loading, refresh, add, deleteById, update };
}
