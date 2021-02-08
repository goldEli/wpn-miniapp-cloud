import React from "react";
import {
  IFurnitureCategory,
  IFurniture,
  IMaterial,
  IMenuListItem
} from "@/type";
import { isEmpty } from "lodash";

export const useMenuListData = (
  list: IFurniture[],
  categoryList: IFurnitureCategory[],
  materialList: IMaterial[]
) => {
  const [data, setData] = React.useState<IMenuListItem[]>([]);
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    if (!categoryList?.length || !list?.length) {
      return;
    }
    const selected = materialList
      .filter(item => item.active)
      .map(item => item.name);
    setData(
      categoryList
        .map(category => {
          const funitureList = list
            .filter(item => item.furnitureCategoryId === category._id)
            .filter(item =>
              selected.length ? selected.includes(item?.material || "") : true
            )
            .sort((a, b) => (a?.index || 0) - (b?.index || 0));
          return {
            category,
            funitureList
          };
        })
        .filter(item => !isEmpty(item.funitureList))
    );
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [list, categoryList, materialList]);

  return [data, loading] as const;
};
