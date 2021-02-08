import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { Picker } from "@tarojs/components";
import { AtList, AtListItem, AtTag } from "taro-ui";
import { IMaterial } from "@/type";

interface IMaterialFilterBtnProps {
  range: IMaterial[];
}

const MaterialFilterBtn: React.FC<IMaterialFilterBtnProps> = props => {
  const [data, setData] = React.useState([
    { name: "火烧石", active: false },
    { name: "大理石", active: false },
    { name: "金刚石", active: false },
    { name: "石木面", active: false },
    { name: "玻璃", active: false },
    { name: "岩板", active: false }
  ]);

  console.log(data, 123);

  const onChange = (name: string) => {
    setData(prev =>
      prev.map(item => {
        if (item.name === name) {
          return { ...item, active: !item.active };
        }
        return item;
      })
    );
  };

  return (
    <View className="filter-box">
      {data.map(item => {
        return (
          <View key={item.name} className="tag-box">
            <AtTag
              type="primary"
              onClick={() => onChange(item.name)}
              active={item.active}
              circle
            >
              {item.name}
            </AtTag>
          </View>
        );
      })}
    </View>
  );
};

MaterialFilterBtn.defaultProps = {
  range: [
    { name: "全部", active: true },
    { name: "火烧石", active: false },
    { name: "大理石", active: false },
    { name: "玻璃", active: false },
    { name: "岩板", active: false },
    { name: "金刚石", active: false },
    { name: "石木面", active: false }
  ]
};

export default MaterialFilterBtn;
