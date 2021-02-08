import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../context/MenuContext";
import ListItem from "../ListItem/index.weapp";
import CategoryTitle from "../CategoryTitle";
import { scrollMenuEventKey } from "@/config/eventCenterKey";

interface IListProps {}

const List: React.FC<IListProps> = props => {
  const { data, loading } = React.useContext(MenuContext);
  const [scrollTop, setScrollTop] = React.useState(0);

  React.useEffect(() => {
    Taro.eventCenter.on(scrollMenuEventKey, handleScroll);
    return () => {
      Taro.eventCenter.on(scrollMenuEventKey, handleScroll);
    };
  }, [data]);

  const handleScroll = async (id: string) => {
    if (!data?.length) return
    Promise.all([
      getDomHeight("menu-item-for-scroll"),
      getDomHeight("category-title")
    ]).then(([itemHeight, titleHeight]) => {
      let currentScrollTop = 0;
      for (let item of data) {
        if (item.category._id === id) {
          break;
        }
        currentScrollTop += titleHeight + item.funitureList.length * itemHeight;
      }
      setScrollTop(currentScrollTop);
    });
  };

  const getDomHeight = (classname: string) => {
    return new Promise<number>((resolve, reject) => {
      Taro.createSelectorQuery()
        .select("." + classname)
        .fields(
          {
            // dataset: true,
            size: true
            // scrollOffset: true,
            // properties: ["scrollX", "scrollY"]
          },
          function(res) {
            resolve(res.height);
          }
        )
        .exec();
    });
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
