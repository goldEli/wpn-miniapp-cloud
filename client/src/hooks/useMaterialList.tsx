import React, { useEffect } from "react";
import { IFurniture, IMaterial } from "@/type";

export const useMaterialList = () => {
  const [materialList, setMaterialList] = React.useState<IMaterial[]>([]);

  const initMaterialist = (list: IFurniture[]) => {
    if (list) {
      const m = list.filter(item => item?.material).map(item => item.material);
      setMaterialList(
        Array.from(new Set(m))?.map(item => ({
          name: item || "",
          active: false
        }))
      );
    }
  };

  const selectMaterial = (name: string) => {
    setMaterialList(prev => {
      return prev.map(item => {
        if (item.name === name) {
          return { ...item, active: !item.active };
        }
        return item;
      });
    });
  };

  return { materialList, selectMaterial, initMaterialist };
};
