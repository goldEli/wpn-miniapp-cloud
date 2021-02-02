import React from "react";
import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import { AtFloatLayout, AtInput, AtButton } from "taro-ui";
import useModal from "@/hooks/useModal";
import { updateCategoryModalkey } from "@/config/modalKey";
import { IFurnitureCategory } from "@/type";

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
      setParams(modalData);
    } else {
      setParams(initParsms);
    }
  }, [modalData]);

  const onChange = (key: string, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };
  const onChangeForNumber = (key: keyof IFurnitureCategory, value: string) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  const checkValid = () => {
    if (!params.name) {
      Taro.atMessage({
        message: "输入名称",
        type: "error"
      });
      return false;
    }
    if (!params.index) {
      Taro.atMessage({
        message: "输入排序",
        type: "error"
      });
      return false;
    }
    return true;
  };

  const onOk = () => {
    if (!checkValid()) return;
    if (isAdd) {
      props.add(params);
    } else {
      props.update(params);
    }

    close();
  };
  const title = isAdd ? "新增" : "修改";

  const handleNumber = (value: number | undefined) => {
    if (typeof value === "number") {
      return value + "";
    } else {
      return "";
    }
  };
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
      <AtInput
        name="index"
        title="排序"
        type="number"
        placeholder="数字越小排在越前面"
        value={handleNumber(params.index)}
        onChange={(value: string) => onChangeForNumber("index", value)}
      />
      <AtButton type="primary" onClick={onOk}>
        确定
      </AtButton>
    </AtFloatLayout>
  );
};

export const open = (data?: { id?: string; name?: string; index?: number }) => {
  Taro.eventCenter.trigger(updateCategoryModalkey, data);
};

export default UpdateCategory;
