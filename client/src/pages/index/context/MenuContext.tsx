import React from "react";
import {
  IFurniture,
} from "@/type";
import useMenuHook from "@/hooks/useMenuHook";

export const MenuContext = React.createContext<{
  loading: boolean;
  list?: IFurniture[];
  action?: {
    plus?: (_id: string) => void;
    sub?: (_id: string) => void;
    changeNumber?: (_id: string, number: number) => void;
  };
}>({
  loading: true
});

interface IMenuContextProviderProps {}
export const MenuContextProvider: React.FC<IMenuContextProviderProps> = props => {
  const {
    list,
    action: { plus, sub, changeNumber },
    loading
  } = useMenuHook();
  

  const action = {
    plus,
    sub,
    changeNumber
  };

  return (
    <MenuContext.Provider
      value={{
        list,
        loading,
        action
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
