import React, { useEffect } from "react";
import { http } from "@/utils";
import { IFurniture } from "@/type";
import { omit } from "lodash";
const urlKey = "menu";

export default function useFurnitureList() {
  const [furnitureList, setFurnitureList] = React.useState<IFurniture[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    refresh();
  }, []);
  const refresh = async () => {
    const data = await http(urlKey, {
      action: "getAll",
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
    refresh();
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
        data: omit(data, ["_id"])
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
