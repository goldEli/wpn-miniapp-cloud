import React from "react";
import { IFurniture, IFurnitureCategory, IMaterial, IMenuListItem } from "@/type";
import useMenuHook from "@/hooks/useMenuHook";
import useFurnitureCategory from "@/hooks/useFurnitureCategory";
import { useMaterialList } from "../hooks/useMaterialList";
import { useMenuListData } from "../hooks/useMenuListData";

export const MenuContext = React.createContext<{
  categoryList?: IFurnitureCategory[];
  loading: boolean;
  data?: IMenuListItem[];
  list?: IFurniture[];
  materialList?: IMaterial[];
  action?: {
    plus: (_id: string) => void;
    sub: (_id: string) => void;
    selectMaterial: (name: string) => void;
  };
}>({});

interface IMenuContextProviderProps {}
export const MenuContextProvider: React.FC<IMenuContextProviderProps> = props => {
  const {
    list,
    action: { plus, sub }
  } = useMenuHook();
  const { categoryList } = useFurnitureCategory();
  const { materialList, selectMaterial } = useMaterialList(list);
  const [data, loading] = useMenuListData(list, categoryList, materialList);

  const action = {
    selectMaterial,
    plus,
    sub
  };

  return (
    <MenuContext.Provider
      value={{
        categoryList: data.map(item => item.category),
        list,
        data,
        loading: loading,
        materialList,
        action
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
