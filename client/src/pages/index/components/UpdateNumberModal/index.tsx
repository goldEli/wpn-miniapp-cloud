import React, { useContext } from "react";
import Taro, { Config } from "@tarojs/taro";
import { AtFloatLayout, AtInput, AtButton } from "taro-ui";
import useModal from "@/hooks/useModal";
import { updateNumberModalkey } from "@/config/modalKey";
import { isNumber } from "@/utils";
import InputNumber from "@/components/InputNumber";
import { IFurniture } from "@/type";
import { MenuContext } from "../../context/MenuContext";

interface IUpdateNumberModalProps {}

const UpdateNumberModal: React.FC<IUpdateNumberModalProps> = props => {
  const { close, visible, modalData } = useModal<
    Pick<IFurniture, "_id" | "number">
  >(updateNumberModalkey);
  const [value, setValue] = React.useState(0);
  const { action } = useContext(MenuContext);

  React.useEffect(() => {
    if (!isNumber(modalData?.number)) return;
    setValue(modalData?.number as number);
  }, [modalData]);
  const onChange = (key: string, value: number) => {
    setValue(value);
  };
  const onOk = () => {
    action?.changeNumber(modalData._id as string, value);
    close();
  };
  return (
    <AtFloatLayout isOpened={visible} title="修改" onClose={close}>
      <InputNumber
        name="index"
        title="数量"
        type="number"
        placeholder="输入数字"
        value={value}
        handleChange={onChange}
      />
      <AtButton type="primary" onClick={onOk}>
        确定
      </AtButton>
    </AtFloatLayout>
  );
};

export const open = (data: Pick<IFurniture, "_id" | "number">) => {
  Taro.eventCenter.trigger(updateNumberModalkey, data);
};

export default UpdateNumberModal;
