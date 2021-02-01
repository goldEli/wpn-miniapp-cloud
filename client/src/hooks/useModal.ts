import React from "react";
import Taro from "@tarojs/taro";

interface IObject {
  [key:string]: any
}

export default function useModal<T>(eventName: string) {
  const [visible, setVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState<T>({})

  React.useEffect(() => {
    Taro.eventCenter.on(`${eventName}`, open);
    return () => {
      Taro.eventCenter.off(`${eventName}`, open);
    };
  }, []);

  const open = (data?: T) => {
    data && setModalData(data)
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  return { visible, open, close, modalData };
}
