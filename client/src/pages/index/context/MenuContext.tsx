import React from "react";
import { IMenuWithNum } from "@/type";
import useMenuHook from "@/hooks/useMenuHook";

export const MenuContext = React.createContext<{
  loading?: boolean;
  data?: IMenuWithNum[];
  action?: {
    plus: (_id: string) => void;
    sub: (_id: string) => void;
  };
}>({});

interface IMenuContextProviderProps {}
export const MenuContextProvider: React.FC<IMenuContextProviderProps> = props => {
  const { list, loading } = useMenuHook();
  const [data, setData] = React.useState<IMenuWithNum[]>([]);

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
    
    <MenuContext.Provider value={{ data, loading, action }}>
      {props.children}
    </MenuContext.Provider>
  );
};