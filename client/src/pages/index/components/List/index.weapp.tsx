import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import "taro-ui/dist/style/components/icon.scss";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../MenuContext";
import ListItem from "../ListItem/index.weapp";

interface IListProps {}

const List: React.FC<IListProps> = props => {
  const { data, loading } = React.useContext(MenuContext) as any;
  console.log(data, loading);
  return (
    <>
    <ScrollView scrollY scrollWithAnimation className="content-list">
      {loading ? (
        <Skeletons />
      ) : (
        data.map((item, idx) => <ListItem key={item.id} data={item} />)
      )}
    </ScrollView>
    </>
  );
};

export default List;
