import React from "react";
import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
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

interface IUpdateCategoryProps {
  add: (data: IFurniture) => void;
  update: (data: IFurniture) => void;
  deleteById: (_id: string) => void;
  furnitureCategoryId: string;
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
      setData({ ...initData, furnitureCategoryId: props.furnitureCategoryId });
    } else {
      setData({ ...modalData, furnitureCategoryId: props.furnitureCategoryId });
    }
  }, [modalData, visible]);

  const onChange = (key: keyof IFurniture, value: string | Boolean) => {
    setData(prev => ({ ...prev, [key]: value }));
  };
  const onChangeForNumber = (key: keyof IFurniture, value: string) => {
    setData(prev => ({ ...prev, [key]: parseFloat(value) }));
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
    if (_.isEmpty(data.note)) {
      Taro.showToast({
        title: "介绍未填",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    return true;
  };

  const onOk = () => {
    if (!checkValid()) return;
    const newData:IFurniture = {...data, imgSrc: handleImgSrc(data?.imgSrc)}
    if (isAdd) {
      props.add(newData);
    } else {
      props.update(newData);
    }

    close();
  };
  const title = isAdd ? "新增" : "修改";
  const handleNumber = (value: number | undefined) => {
    if (typeof value === "number" && !isNaN(value)) {
      return value + "";
    } else {
      return "";
    }
  };
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
        placeholder="输入系列名称"
        value={data?.title || ""}
        onChange={(value: string) => onChange("title", value)}
      />
      <AtInput
        name="price"
        title="价格"
        type="number"
        placeholder="输入价格"
        value={handleNumber(data?.price)}
        onChange={(value: string) => onChangeForNumber("price", value)}
      />
      <AtInput
        name="index"
        title="排序"
        type="number"
        placeholder="数字越小排在越前面"
        value={handleNumber(data?.index)}
        onChange={(value: string) => onChangeForNumber("index", value)}
      />
      <Title title="图片地址" />
      <AtTextarea
        value={data?.imgSrc || ""}
        onChange={(value: string) => onChange("imgSrc", value)}
        maxLength={1000}
        placeholder="图片地址英文逗号分隔"
      />
      <Title title="介绍" />
      <AtTextarea
        value={data?.note || ""}
        onChange={(value: string) => onChange("note", value)}
        maxLength={1000}
        placeholder="输入家具详情"
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
  if (!value) return ""
  return value
    .split(",")
    .filter(item => !!item)
    .join(",");
};

export const open = (data?: IFurniture) => {
  Taro.eventCenter.trigger(updateFunitureModalkey, data);
};

export default UpdateFurnitrueModal;
