import React, { useEffect } from "react";
import { http } from "@/utils";
import { IFurnitureCategory } from "@/type";
const furnitureCategory = "furnitureCategory";

export default function useFurnitureCategory() {
  const [categoryList, setCategoryList] = React.useState<IFurnitureCategory[]>(
    []
  );
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    refresh();
  }, []);
  const refresh = async () => {
    const data = await http(furnitureCategory, {
      action: "getAll"
    });
    if (data instanceof Array) {
      data.sort((a, b) => a.index - b.index);
      setCategoryList(data);
      setLoading(false);
    }
  };
  const add = async (data: { name: string; index: number }) => {
    await http(
      furnitureCategory,
      {
        action: "add",
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
      furnitureCategory,
      {
        action: "delete",
        _id: _id
      },
      { sucMsg: "删除成功" }
    );

    refresh();
  };

  const update = async (id: string, data: { name: string; index: number }) => {
    await http(
      furnitureCategory,
      {
        action: "update",
        _id: id,
        data
      },
      {
        sucMsg: "修改成功"
      }
    );
    refresh();
  };

  return { categoryList, loading, refresh, add, deleteById, update };
}
