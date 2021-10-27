import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../context/MenuContext";
import ListItem from "../ListItem/index.weapp";

interface IListProps {}

const List: React.FC<IListProps> = props => {
  const { list, loading } = React.useContext(MenuContext);

  return (
    <ScrollView scrollWithAnimation>
      {<Skeletons visible={loading} />}
      <View className="content-list">
        {list?.map(item => {
          return <ListItem data={item} />;
        })}
      </View>
    </ScrollView>
  );
};

export default List;
