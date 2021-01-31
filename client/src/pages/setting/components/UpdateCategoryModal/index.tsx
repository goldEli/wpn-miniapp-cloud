import React from "react";
import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import { AtFloatLayout, AtInput, AtButton } from "taro-ui";
import useModal from "@/hooks/useModal";
import { updateCategoryModalkey } from "@/config/modalKey";

interface IUpdateCategoryProps {
  id?: string;
  name?: string;
  add: (name: string) => void;
  update: (id: string, name: string) => void;
}

const UpdateCategory: React.FC<IUpdateCategoryProps> = props => {
  const { close, visible, modalData } = useModal(updateCategoryModalkey);
  const [params, setParams] = React.useState<{ id?: string; name?: string }>(
    {}
  );

  React.useEffect(() => {
    setParams(modalData);
  }, [modalData]);

  const onChange = (value: string) => {
    setParams(prev => ({ ...prev, name: value }));
  };

  const onOk = () => {
    console.log(params);
    if (params.id && params.name) {
      props.update(params.id, params.name);
    } else {
      params.name && props.add(params.name);
    }

    close();
  };
  return (
    <AtFloatLayout isOpened={visible} title="新增" onClose={close}>
      <AtInput
        name="value"
        title="名称"
        type="text"
        placeholder="输入系列名称"
        value={params.name || ""}
        onChange={onChange}
      />
      <AtButton type="primary" onClick={onOk}>
        确定
      </AtButton>
    </AtFloatLayout>
  );
};

export const open = (id?: string, name?: string) => {
  Taro.eventCenter.trigger(updateCategoryModalkey, { id, name });
};

export default UpdateCategory;
