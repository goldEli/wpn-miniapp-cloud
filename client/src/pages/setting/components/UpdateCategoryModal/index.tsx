import React from "react";
import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import { AtFloatLayout, AtInput, AtButton } from "taro-ui";
import useModal from "@/hooks/useModal";
import { updateCategoryModalkey } from "@/config/modalKey";

interface IUpdateCategoryProps {
  id?: string;
  name?: string;
}

const UpdateCategory: React.FC<IUpdateCategoryProps> = props => {
  const [value, setValue] = React.useState("");
  const { close, visible } = useModal(updateCategoryModalkey);
  const onChange = (value: string) => {
    setValue(value);
  };
  const onOk = () => {
    close()
  };
  return (
    <AtFloatLayout isOpened={visible} title="新增" onClose={close}>
      <AtInput
        name="value"
        title="名称"
        type="text"
        placeholder="输入系列名称"
        value={value}
        onChange={onChange}
      />
      <AtButton type="primary" onClick={onOk}>确定</AtButton>
    </AtFloatLayout>
  );
};

export const open = () => {
  Taro.eventCenter.trigger(updateCategoryModalkey);
};

export default UpdateCategory;
