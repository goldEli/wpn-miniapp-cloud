import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../context/MenuContext";
import ListItem from "../ListItem/index.weapp";

interface IListProps {}

const List: React.FC<IListProps> = props => {
  const { data, loading } = React.useContext(MenuContext);
  console.log(data, loading);
  return (
    <View className="content-list">
      <ScrollView scrollY scrollWithAnimation>
        {loading ? (
          <Skeletons />
        ) : (
          data?.map((item, idx) => <ListItem key={item._id} data={item} />)
        )}
      </ScrollView>
    </View>
  );
};

export default List;
