import React from "react";
import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import { AtFloatLayout, AtInput, AtButton } from "taro-ui";
import useModal from "@/hooks/useModal";
import { updateCategoryModalkey } from "@/config/modalKey";

interface IUpdateCategoryProps {
  add: (data: { name: string; index: number }) => void;
  update: (id: string, data: { name: string; index: number }) => void;
}

interface IParams {
  id?: string;
  name: string;
  index: string;
}
const initParsms = {
 index: "0", name: "" 
}

const UpdateCategory: React.FC<IUpdateCategoryProps> = props => {
  const { close, visible, modalData } = useModal(updateCategoryModalkey);
  const [params, setParams] = React.useState<IParams>(initParsms);

  React.useEffect(() => {
    if (modalData.id) {
      setParams(modalData);
    } else {
      setParams(initParsms)
    }
  }, [modalData]);

  const onChange = (key: string, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
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
    console.log(params);
    if (!checkValid()) return;
    if (params.id) {
      props.update(params.id, {
        name: params.name,
        index: Number(params.index)
      });
    } else {
      props.add({ name: params.name, index: Number(params.index) });
    }

    close();
  };
  return (
    <AtFloatLayout isOpened={visible} title="新增" onClose={close}>
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
        value={params.index}
        onChange={(value: string) => onChange("index", value)}
      />
      <AtButton type="primary" onClick={onOk}>
        确定
      </AtButton>
    </AtFloatLayout>
  );
};

export const open = (data?: {id?: string, name?: string, index?: number}) => {
  Taro.eventCenter.trigger(updateCategoryModalkey, data);
};

export default UpdateCategory;
