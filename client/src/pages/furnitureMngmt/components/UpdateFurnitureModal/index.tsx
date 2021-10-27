import React from "react";
import Taro from "@tarojs/taro";
import {
  AtSwitch,
  AtFloatLayout,
  AtInput,
  AtButton,
  AtTextarea
} from "taro-ui";
import useModal from "@/hooks/useModal";
import { updateFunitureModalkey } from "@/config/modalKey";
import { IFurniture } from "@/type";
import Title from "@/components/Title";
import { isNumber } from "@/utils";
import _ from "lodash";
import InputNumber from "@/components/InputNumber";

interface IUpdateCategoryProps {
  add: (data: IFurniture) => void;
  update: (data: IFurniture) => void;
  deleteById: (_id: string) => void;
}

const initData: IFurniture = {
  onSale: true
};

const UpdateFurnitrueModal: React.FC<IUpdateCategoryProps> = props => {
  const { close, visible, modalData } = useModal<IFurniture>(
    updateFunitureModalkey
  );
  // const [params, setParams] = React.useState<IParams>(initParsms);
  const [data, setData] = React.useState<IFurniture>(initData);

  const isAdd = !modalData?._id;

  React.useEffect(() => {
    if (!visible) return;
    if (isAdd) {
      setData({ ...initData });
    } else {
      setData({ ...modalData });
    }
  }, [modalData, visible]);

  const onChange = (
    key: keyof IFurniture,
    value: string | Boolean | number
  ) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const checkValid = () => {
    if (_.isEmpty(data.title)) {
      Taro.showToast({
        title: "名称未填",
        icon: "none",
        duration: 2000
      });
      return false;
    }
  
    if (!isNumber(data?.price)) {
      // if (_.isEmpty(data.price)) {
      Taro.showToast({
        title: "价格未填",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    if (!isNumber(data?.index)) {
      // if (_.isEmpty(data.index)) {
      Taro.showToast({
        title: "排序未填",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    if (_.isEmpty(data.imgSrc)) {
      Taro.showToast({
        title: "图片地址未填",
        icon: "none",
        duration: 2000
      });
      return false;
    }
   
    return true;
  };

  const onOk = () => {
    if (!checkValid()) return;
    const newData: IFurniture = { ...data, imgSrc: handleImgSrc(data?.imgSrc) };
    if (isAdd) {
      props.add(newData);
    } else {
      props.update(newData);
    }

    close();
  };
  const title = isAdd ? "新增" : "修改";
  const onDelete = () => {
    props.deleteById(data?._id || "");
    close();
  };
  return (
    <AtFloatLayout isOpened={visible} title={title} onClose={close}>
      <Title title="基本信息" />
      <AtInput
        name="title"
        title="名称"
        type="text"
        placeholder="输入名称"
        value={data?.title || ""}
        onChange={(value: string) => onChange("title", value)}
      />
      <InputNumber
        name="price"
        title="价格"
        type="number"
        placeholder="输入价格"
        value={data?.price}
        handleChange={onChange}
      />
      <AtInput
        name="weight"
        title="重量"
        type="text"
        placeholder="比如：128g"
        value={data?.weight || ""}
        onChange={(value: string) => onChange("weight", value)}
      />
      <AtInput
        name="unit"
        title="单位"
        type="text"
        placeholder="比如：袋"
        value={data?.unit || ""}
        onChange={(value: string) => onChange("unit", value)}
      />
      <InputNumber
        name="index"
        title="排序"
        type="number"
        placeholder="数字越小排在越前面"
        value={data?.index}
        handleChange={onChange}
      />
      
      <Title title="图片地址" />
      <AtTextarea
        value={data?.imgSrc || ""}
        onChange={(value: string) => onChange("imgSrc", value)}
        maxLength={1000}
      />
      
      <AtSwitch
        title="是否上架"
        checked={data?.onSale}
        onChange={(value: boolean) => onChange("onSale", value)}
      />
      <AtButton type="primary" onClick={onOk}>
        确定
      </AtButton>
      <AtButton type="secondary" onClick={onDelete}>
        删除
      </AtButton>
    </AtFloatLayout>
  );
};

const handleImgSrc = (value?: string): string => {
  if (!value) return "";
  return value
    .split(",")
    .filter(item => !!item)
    .join(",");
};

export const open = (data?: IFurniture) => {
  Taro.eventCenter.trigger(updateFunitureModalkey, data);
};

export default UpdateFurnitrueModal;
