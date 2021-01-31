import React, { useEffect } from "react";
import { Button, View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtSwipeAction, AtList, AtListItem, AtButton } from "taro-ui";
import "./index.less";
import Title from "@/components/Title";
import UpdateCategoryModal, { open } from "./components/UpdateCategoryModal";
import useFurnitureCategory from "@/hooks/useFurnitureCategory";

interface ISettingProps {}
const options: {
  id?: string;
  key: string;
  text: string;
  style: any;
}[] = [
  {
    key: "modify",
    text: "修改",
    style: {
      backgroundColor: "#6190E8"
    }
  },
  {
    key: "delete",
    text: "删除",
    style: {
      backgroundColor: "#FF4949"
    }
  }
];

const Setting: React.FC<ISettingProps> = props => {
  const { categoryList, add, update, deleteById } = useFurnitureCategory();
  const handleSwipeAction = (
    key: string,
    id: string,
    data: { name: string; index: number; id: string }
  ) => {
    if (key === "modify") {
      open(data);
    }
    if (key === "delete") {
      Taro.showModal({
        title: "提示",
        content: "删除会导致该系列下的所有家具信息被删除！！！",
        success: function(res) {
          if (res.confirm) {
            deleteById(id);
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  };
  const goToFurnitureMngmtPage = (id:string) => {
    Taro.navigateTo({
      url: `/pages/furnitureMngmt/index?id=${id}`
    });
  };
  return (
    <>
      <View className="wme-setting">
        <Title title="系列" />
        <AtButton onClick={() => open()} type="primary">
          新增
        </AtButton>
        <AtList>
          {categoryList
            .sort((a, b) => a.index - b.index)
            .map(item => {
              return (
                <AtSwipeAction
                  onClick={(value: any) => {
                    handleSwipeAction(value.key, item._id, {
                      id: item._id,
                      name: item.name,
                      index: item.index
                    });
                  }}
                  key={item._id}
                  autoClose
                  options={options}
                >
                  <AtListItem
                    onClick={() => goToFurnitureMngmtPage(item._id)}
                    arrow="right"
                    title={`${item.index}. ${item.name}`}
                  />
                </AtSwipeAction>
              );
            })}
        </AtList>
        <UpdateCategoryModal update={update} add={add} />
      </View>
    </>
  );
};

export default Setting;
