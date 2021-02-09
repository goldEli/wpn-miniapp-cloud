import React from "react";
import {
  IFurniture,
  IFurnitureCategory,
  IMaterial,
  IMenuListItem
} from "@/type";
import useMenuHook from "@/hooks/useMenuHook";
import useFurnitureCategory from "@/hooks/useFurnitureCategory";
import { useMenuListData } from "@/hooks/useMenuListData";

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
    onSelectCategory: (id: string) => void;
  };
}>({});

interface IMenuContextProviderProps {}
export const MenuContextProvider: React.FC<IMenuContextProviderProps> = props => {
  const {
    list,
    materialList,
    action: { plus, sub, selectMaterial },
    loading: listLoading
  } = useMenuHook();
  const {
    categoryList,
    loading: categoryLoading,
    onSelectCategory
  } = useFurnitureCategory();
  const [data] = useMenuListData(list, categoryList, materialList);

  const action = {
    selectMaterial,
    onSelectCategory,
    plus,
    sub
  };

  const isLoading = () => {
    return ![listLoading, categoryLoading].some(item => item === false)
  }

  return (
    <MenuContext.Provider
      value={{
        categoryList: data.map(item => item.category),
        list,
        data,
        loading: isLoading(),
        materialList,
        action
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
