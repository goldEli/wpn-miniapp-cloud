import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import classnames from "classnames";

interface INavProps {}

const data = [
  { id: "1", name: "系列A" },
  { id: "2", name: "系列B" },
  { id: "3", name: "系发士大夫列C" },
  { id: "4", name: "系列D" },
  { id: "5", name: "系列E" }
];

const Nav: React.FC<INavProps> = props => {
  const [activeId, setActiveId] = React.useState("1");

  const changeNav = (id: string) => {
    setActiveId(id);
  };

  return (
    <View className="content-nav">
      <ScrollView scrollY scrollWithAnimation>
        {data.map(item => {
          const classes = classnames("btn", {
            active: item.id === activeId
          });
          return (
            <Text
              onClick={() => changeNav(item.id)}
              key={item.id}
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
