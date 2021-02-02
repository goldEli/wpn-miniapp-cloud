import React, { useEffect } from "react";
import { http } from "@/utils";
import { IFurnitureCategory } from "@/type";
import _ from "lodash";
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
  const add = async (data: IFurnitureCategory) => {
    console.log(data, "123")
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

  const update = async (data: IFurnitureCategory) => {
    console.log(_.omit(data, ["_id"]), "upate")
    await http(
      furnitureCategory,
      {
        action: "update",
        _id: data._id,
        data: _.omit(data, ["_id"])
      },
      {
        sucMsg: "修改成功"
      }
    );
    refresh();
  };

  return { categoryList, loading, refresh, add, deleteById, update };
}
