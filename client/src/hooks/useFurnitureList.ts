import React, { useEffect } from "react";
import { http } from "@/utils";
import { IFurniture, IFurnitureCategory } from "@/type";
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
        _id: data._id,
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

  const update = async (data: IFurniture) => {
    await http(
      urlKey,
      {
        action: "update",
        _id: data._id,
        data: handleData(data)
      },
      {
        sucMsg: "修改成功"
      }
    );
    // refresh();
    setFurnitureList(prev => {
      return prev.map(item => {
        if (item._id === data._id) {
          return { ...item, ...data };
        }
        return item;
      });
    });
  };

  return { furnitureList, loading, refresh, add, deleteById, update };
}
function handleData(data: IFurniture) {
  const ret = { ...data };
  delete ret._id;
  for (let key in ret) {
    if (["price", "index"].includes(key)) {
      ret[key] = Number(ret[key]);
    }
  }
  return ret;
}
