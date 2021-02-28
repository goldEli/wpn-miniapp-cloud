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
    const data = (await http(furnitureCategory, {
      action: "getAll"
    })) as IFurnitureCategory[];
    if (data instanceof Array) {
      setCategoryList(
        data
          .map((item, idx) => ({ ...item, seleted: idx === 0 }))
          .sort((a, b) => a.index - b.index)
      );
      setLoading(false);
    }
  };

  const onSelectCategory = (id: string) => {
    setCategoryList(prev => {
      return prev.map(item => {
        if (item._id === id) {
          return { ...item, seleted: true };
        }
        return { ...item, seleted: false };
      });
    });
  };

  const add = async (data: IFurnitureCategory) => {
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

    setCategoryList(prev => {
      return prev.filter(item => item._id !== _id);
    });
  };

  const update = async (data: IFurnitureCategory) => {
    await http(
      furnitureCategory,
      {
        action: "update",
        _id: data._id,
        data: _.omit(data, ["_id"])
      },
      { sucMsg: "修改成功" }
    );
    setCategoryList(prev => {
      return prev.map(item => {
        return item._id === data._id ? data : item;
      });
    });
  };

  return {
    categoryList,
    loading,
    refresh,
    add,
    deleteById,
    update,
    onSelectCategory
  };
}
