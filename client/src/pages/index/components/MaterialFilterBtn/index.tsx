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
    { name: "全部", active: true },
    { name: "火烧石", active: false },
    { name: "大理石", active: false },
    { name: "玻璃", active: false },
    { name: "岩板", active: false },
    { name: "金刚石", active: false },
    { name: "石木面", active: false }
  ]);

  console.log(data, 123)

  const onChange = e => {
    const { value } = e.detail;
    // console.log(e)
    setData(prev => {
      return prev.map((item, idx) => {
        if (idx == value) {
          return { ...item, active: true };
        }
        return { ...item, active: false };
      });
    });
  };

  return (
    <View className="tag-box">
      <Picker
        mode="selector"
        range={data.map(item => item.name)}
        onChange={onChange}
      >
        <AtTag type="primary" circle>
          {`材质(${data.find(item => item.active)?.name})`}
        </AtTag>
      </Picker>
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
