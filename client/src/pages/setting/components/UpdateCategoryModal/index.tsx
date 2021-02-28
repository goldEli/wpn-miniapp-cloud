import React from "react";
import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import { AtFloatLayout, AtInput, AtButton } from "taro-ui";
import useModal from "@/hooks/useModal";
import { updateCategoryModalkey } from "@/config/modalKey";
import { IFurniture, IFurnitureCategory } from "@/type";
import { isNumber } from "@/utils";
import InputNumber from "@/components/InputNumber";

interface IUpdateCategoryProps {
  add: (data: IFurnitureCategory) => void;
  update: (data: IFurnitureCategory) => void;
}

// interface IParams {
//   id?: string;
//   name: string;
//   index: string;
// }
const initParsms = {};

const UpdateCategory: React.FC<IUpdateCategoryProps> = props => {
  const { close, visible, modalData } = useModal<IFurnitureCategory>(
    updateCategoryModalkey
  );
  const [params, setParams] = React.useState<IFurnitureCategory>(initParsms);

  const isAdd = !modalData._id;

  React.useEffect(() => {
    if (isAdd) {
      setParams(initParsms);
    } else {
      setParams(modalData);
    }
  }, [modalData]);

  const onChange = (key: string, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const checkValid = () => {
    if (!params.name) {
      Taro.showToast({
        title: "输入名称",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    if (!isNumber(params?.index)) {
      Taro.showToast({
        title: "输入排序",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    return true;
  };

  const onOk = () => {
    console.log("ok", params);

    if (!checkValid()) return;
    if (isAdd) {
      props.add(params);
    } else {
      props.update(params);
    }

    close();
  };
  const title = isAdd ? "新增" : "修改";

  return (
    <AtFloatLayout isOpened={visible} title={title} onClose={close}>
      <AtInput
        name="name"
        title="名称"
        type="text"
        placeholder="输入系列名称"
        value={params.name || ""}
        onChange={(value: string) => onChange("name", value)}
      />
      <InputNumber
        name="index"
        title="排序"
        type="number"
        placeholder="数字越小排在越前面"
        value={params.index}
        handleChange={onChange}
      />
      <AtButton type="primary" onClick={onOk}>
        确定
      </AtButton>
    </AtFloatLayout>
  );
};

export const open = (data?: IFurniture) => {
  Taro.eventCenter.trigger(updateCategoryModalkey, data);
};

export default UpdateCategory;
