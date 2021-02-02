import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../context/MenuContext";
import ListItem from "../ListItem/index.weapp";
import CategoryTitle from "../CategoryTitle";

interface IListProps {}

const List: React.FC<IListProps> = props => {
  const { data, loading, categoryList } = React.useContext(MenuContext);
  return (
    <View className="content-list">
      {/* <ScrollView scrollY scrollWithAnimation> */}
      {loading ? (
        <Skeletons />
      ) : (
        <>
          {categoryList?.map(category => {
            return (
              <View>
                <CategoryTitle id={category._id} name={category.name}/>
                {data
                  ?.filter(item => item.furnitureCategoryId === category._id)
                  .sort((a, b) => (a?.index || 0) - (b?.index || 0))
                  .map(item => (
                    <ListItem key={item._id} data={item} />
                  ))}
              </View>
            );
          })}
        </>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default List;
