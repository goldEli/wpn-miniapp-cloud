import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import classnames from "classnames";
import { MenuContext } from "@/pages/index/context/MenuContext";
import { navActiveIdKey, scrollMenuEventKey } from "@/config/eventCenterKey";

interface INavProps {}

const Nav: React.FC<INavProps> = props => {
  const { categoryList, action: {onSelectCategory} } = React.useContext(MenuContext);

  useEffect(() => {
    Taro.eventCenter.on(navActiveIdKey, changeNavWithOutScroll);
    return () => {
      Taro.eventCenter.on(navActiveIdKey, changeNavWithOutScroll);
    };
  }, []);

  const changeNavWithOutScroll = (id: string) => {
    onSelectCategory(id);
  };

  const changeNav = (id: string) => {
    Taro.eventCenter.trigger(scrollMenuEventKey, id);
    onSelectCategory(id);
  };

  return (
    <ScrollView className="content-nav" scrollY scrollWithAnimation>
      <View className="fix-box at-tag--primary">
        <>
          {categoryList?.map(item => {
            const classes = classnames("btn", {
              active: item.seleted
            });
            return (
              <Text
                onClick={() => changeNav(item._id || "")}
                key={item._id}
                className={classes}
              >
                {item.name}
              </Text>
            );
          })}
        </>
        <View className="spacer"></View>
      </View>
    </ScrollView>
  );
};

export default Nav;
