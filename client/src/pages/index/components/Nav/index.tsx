import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import classnames from "classnames";
import { MenuContext } from "@/pages/index/context/MenuContext";

interface INavProps {}

const Nav: React.FC<INavProps> = props => {
  const [activeId, setActiveId] = React.useState<string>("");
  const { categoryList } = React.useContext(MenuContext);

  useEffect(() => {
    if (categoryList?.length) {
      setActiveId(categoryList[0]._id  || "");
    }
  }, [categoryList]);

  const changeNav = (id: string) => {
    setActiveId(id);
  };

  return (
    <View className="content-nav">
      <ScrollView scrollY scrollWithAnimation>
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
      </ScrollView>
    </View>
  );
};

export default Nav;
