import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import classnames from "classnames";
import { MenuContext } from "@/pages/index/context/MenuContext";
import { navActiveIdKey } from "@/config/eventCenterKey";

interface INavProps {}

const Nav: React.FC<INavProps> = props => {
  const [activeId, setActiveId] = React.useState<string>("");
  const { categoryList } = React.useContext(MenuContext);

  useEffect(() => {
    if (categoryList?.length) {
      setActiveId(categoryList[0]._id || "");
    }
  }, [categoryList]);

  useEffect(() => {
    Taro.eventCenter.on(navActiveIdKey, changeNavWithOutScroll);
    return () => {
      Taro.eventCenter.on(navActiveIdKey, changeNavWithOutScroll);
    };
  }, []);

  // useEffect(() => {
  // }, [activeId]);
  const changeNavWithOutScroll = (id: string) => {
    setActiveId(id);
  };

  const changeNav = (id: string) => {
    Taro.pageScrollTo({
      duration: 300,
      selector: "#the-" + id
    });
    setActiveId(id);
  };

  return (
    <View className="content-nav">
      <View className="fix-box">
        {/* <ScrollView scrollY scrollWithAnimation> */}
        {categoryList?.map(item => {
          const classes = classnames("btn", {
            active: item._id === activeId
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
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default Nav;
