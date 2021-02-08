import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../context/MenuContext";
import ListItem from "../ListItem/index.weapp";
import CategoryTitle from "../CategoryTitle";
import { scrollMenuEventKey } from "@/config/eventCenterKey";

interface IListProps {}
const titleHight = 21;
const ItemHight = 85+8;

const List: React.FC<IListProps> = props => {
  const { data, loading } = React.useContext(MenuContext);
  const [scrollTop, setScrollTop] = React.useState(0);

  React.useEffect(() => {
    Taro.eventCenter.on(scrollMenuEventKey, handleScroll);
    return () => {
      Taro.eventCenter.on(scrollMenuEventKey, handleScroll);
    };
  }, [data]);

  const handleScroll = (id: string) => {
    if (!data?.length) return;
    let currentScrollTop = 0;
    for (let item of data) {
      if (item.category._id === id) {
        break;
      }
      currentScrollTop += titleHight + item.funitureList.length * ItemHight;
    }
    setScrollTop(currentScrollTop);
  };

  return (
    <ScrollView
      className="content-list"
      scrollTop={scrollTop}
      scrollY
      scrollWithAnimation
    >
      {/* <View className="content-list"> */}
      {loading ? (
        <Skeletons />
      ) : (
        <>
          {data?.map(item => {
            return (
              <View>
                <CategoryTitle
                  id={item.category._id}
                  name={item.category.name}
                />
                {item.funitureList.map(furniture => (
                  <ListItem key={furniture._id} data={furniture} />
                ))}
              </View>
            );
          })}
        </>
      )}
      {/* </View> */}
    </ScrollView>
  );
};

export default List;
