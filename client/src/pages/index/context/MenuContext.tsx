import React from "react";
import { IFurniture, IFurnitureCategory, IMaterial } from "@/type";
import useMenuHook from "@/hooks/useMenuHook";
import useFurnitureCategory from "@/hooks/useFurnitureCategory";
import { useMaterialList } from "./useMaterialList";
import { isEmpty } from "lodash";

export const MenuContext = React.createContext<{
  categoryList?: IFurnitureCategory[];
  loading?: boolean;
  data?: {
    category: IFurnitureCategory;
    funitureList: IFurniture[];
  }[];
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
  const [data, setData] = React.useState<
    {
      category: IFurnitureCategory;
      funitureList: IFurniture[];
    }[]
  >([]);
  const { loading: categoryListLoading, categoryList } = useFurnitureCategory();
  const { materialList, selectMaterial } = useMaterialList(list);

  React.useEffect(() => {
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
  }, [list, categoryList, materialList]);

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
