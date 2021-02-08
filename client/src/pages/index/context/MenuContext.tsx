import React from "react";
import { IFurniture, IFurnitureCategory, IMaterial, IMenuListItem } from "@/type";
import useMenuHook from "@/hooks/useMenuHook";
import useFurnitureCategory from "@/hooks/useFurnitureCategory";
import { useMaterialList } from "./useMaterialList";
import { useMenuListData } from "./useMenuListData";

export const MenuContext = React.createContext<{
  categoryList?: IFurnitureCategory[];
  loading?: boolean;
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
    loading,
    action: { plus, sub }
  } = useMenuHook();
  const { loading: categoryListLoading, categoryList } = useFurnitureCategory();
  const { materialList, selectMaterial } = useMaterialList(list);
  const [data] = useMenuListData(list, categoryList, materialList);

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
        loading: loading && categoryListLoading,
        materialList,
        action
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
