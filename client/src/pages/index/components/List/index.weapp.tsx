import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../context/MenuContext";
import ListItem from "../ListItem/index.weapp";
import "./index.less";
import { handlePrice } from "@/utils";

interface IListProps {}

const List: React.FC<IListProps> = props => {
  const { list, loading } = React.useContext(MenuContext);

  return (
    <ScrollView
      scrollY
      scrollTop={0}
      style={{ height: "100vh" }}
      scrollWithAnimation
    >
      <Skeletons visible={loading} />
      <View className="content-list">
        {list?.sort((a,b) => (a.index || 0) - (b.index || 0))?.map(item => {
          return <ListItem data={item} />;
        })}
      </View>
      {/* <View className="blank"></View> */}
    </ScrollView>
  );
};

export default List;
