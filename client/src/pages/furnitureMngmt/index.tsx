import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Item from "./components/Item";
import "./index.less";
import useFurnitureList from "@/hooks/useFurnitureList";
import UpdateFurnitureModal, { open } from "./components/UpdateFurnitureModal";

interface IFurnitureMngmtProps {}

const FurnitureMngmt: React.FC<IFurnitureMngmtProps> = props => {
  const id =
    getCurrentInstance().router?.params?.id ||
    "3b020ca36014d640019bf0e55a2aa37c";

  // const [furnitureCategoryId, setFurnitureCategoryId] = React.useState(id);
  const {
    refresh,
    furnitureList,
    add,
    deleteById,
    update
  } = useFurnitureList();
  React.useEffect(() => {
    if (!id) return;
    refresh(id);
  }, [id]);

  const onAdd = () => {
    open();
  };

  return (
    <View className="wme-forniture-mngmt">
      <AtButton onClick={onAdd}>新增</AtButton>
      {furnitureList?.sort((a, b) => a.index - b.index)
        ?.map(item => {
          return <Item data={item} />;
        })}
      <UpdateFurnitureModal
        furnitureCategoryId={id}
        add={add}
        deleteById={deleteById}
        update={update}
      />
    </View>
  );
};

export default FurnitureMngmt;
