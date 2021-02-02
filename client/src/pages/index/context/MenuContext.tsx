import React from "react";
import { IFurniture, IFurnitureCategory } from "@/type";
import useMenuHook from "@/hooks/useMenuHook";
import useFurnitureCategory from "@/hooks/useFurnitureCategory";

export const MenuContext = React.createContext<{
  categoryList?: IFurnitureCategory[];
  loading?: boolean;
  data?: IFurniture[];
  action?: {
    plus: (_id: string) => void;
    sub: (_id: string) => void;
  };
}>({});

interface IMenuContextProviderProps {}
export const MenuContextProvider: React.FC<IMenuContextProviderProps> = props => {
  const { list, loading } = useMenuHook();
  const [data, setData] = React.useState<IFurniture[]>([]);
  const { categoryList } = useFurnitureCategory();

  React.useEffect(() => {
    if (list) {
      setData(
        list.filter(item => item.onSale).map(item => ({ ...item, number: 0 }))
      );
    }
  }, [list]);

  const action = {
    plus: (_id: string) => {
      setData(prev => {
        return prev.map(item => {
          if (item._id === _id) {
            return { ...item, number: item.number + 1 };
          }
          return item;
        });
      });
    },
    sub: (_id: string) => {
      setData(prev => {
        return prev.map(item => {
          if (item._id === _id && item.number > 0) {
            return { ...item, number: item.number - 1 };
          }
          return item;
        });
      });
    }
  };

  return (
    <MenuContext.Provider value={{ categoryList, data, loading, action }}>
      {props.children}
    </MenuContext.Provider>
  );
};
