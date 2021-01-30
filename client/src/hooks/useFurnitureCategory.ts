import React, { useEffect } from "react";
import { http } from "@/utils";
import { IFurnitureCategory } from "@/type";

export default function useFurnitureCategory() {
  const [categoryList, setCategoryList] = React.useState<IFurnitureCategory[]>(
    []
  );
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await http("furnitureCategory", {
      action: "getAll"
    });
    if (data instanceof Array) {
      data.sort((a, b) => a.index - b.index);
      setCategoryList(data);
      setLoading(false);
    }
  };

  return { categoryList, loading };
}
