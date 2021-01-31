import React from "react";
import Taro from "@tarojs/taro";

export default function useModal(eventName: string) {
  const [visible, setVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState<any>({})

  React.useEffect(() => {
    Taro.eventCenter.on(`${eventName}`, open);
    return () => {
      Taro.eventCenter.off(`${eventName}`, open);
    };
  }, []);

  const open = (data?: any) => {
    data && setModalData(data)
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  return { visible, open, close, modalData };
}
