import React, { useEffect } from "react";
import Taro, { Config, getCurrentInstance } from "@tarojs/taro";
import { Button, View, Text } from "@tarojs/components";
import { AtList, AtListItem, AtInput, AtButton, AtTextarea } from "taro-ui";
import "./index.less";
import { IMenuWithNum } from "@/type";
import Title from "@/components/Title";

interface IOrderProps {}

type NameKey = "name" | "phone" | "address" | "express" | "expressPhone";
const expressInputData: {
  name: NameKey;
  title: string;
  placeholder: string;
  type: "number" | "text" | "password" | "phone" | "idcard" | "digit";
}[] = [
  {
    name: "name",
    title: "收货人名称",
    placeholder: "请输入名称",
    type: "text"
  },
  {
    name: "phone",
    title: "收货人电话",
    placeholder: "请输入电话",
    type: "phone"
  },
  {
    name: "address",
    title: "收货人地址",
    placeholder: "请输入地址",
    type: "text"
  },
  {
    name: "express",
    title: "货运部名称",
    placeholder: "请输入货运部名称",
    type: "text"
  },
  {
    name: "expressPhone",
    title: "货运部电话",
    placeholder: "请输入货运部电话",
    type: "phone"
  }
];

const Order: React.FC<IOrderProps> = props => {
  const [orderData, setOrderData] = React.useState<IMenuWithNum[]>([]);
  const [expressInfo, setExpressInfo] = React.useState({
    name: "",
    phone: "",
    address: "",
    express: "",
    expressPhone: ""
  });
  useEffect(() => {
    const text = getCurrentInstance().router?.params?.text || "";
    const data: IMenuWithNum[] = text ? JSON.parse(text) : [];
    setOrderData(
      data.map(item => {
        const total = parseFloat((item.number * (item.price || 0)).toFixed(2));
        return {
          ...item,
          total: total
        };
      })
    );
  }, []);

  const sum = orderData.reduce((prev, item) => prev + (item.total || 0), 0);

  const onInputChange = (name: NameKey, value: any) => {
    setExpressInfo(prev => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <View className="wme-order">
        <Title title="订单信息" />
        <AtList>
          {orderData.map(item => {
            return (
              <AtListItem
                title={item.title}
                note={`${item.number}x${item.price} = ${item.total}`}
              />
            );
          })}
        </AtList>
        <AtListItem title="共计" note={`${sum} 元`} />
        <Title title="物流信息" />
        {/* {expressInputData.map(item => {
          return (
            <AtInput
              name={item.name}
              // title={item.title}
              type={item.type}
              placeholder={item.placeholder}
              value={expressInfo[item.name]}
              onChange={value => onInputChange(item.name, value)}
            />
          );
        })} */}
        {/* <View> */}
        {/* <View className="label">收货人名称：</View> */}
        <AtInput
          title="收货人名称"
          name="name"
          type="text"
          placeholder={"请输入收货人名称"}
          value={expressInfo.name}
          onChange={value => onInputChange("name", value)}
        />
        {/* </View> */}
        {/* <View> */}
        {/* <View className="label">收货人电话：</View> */}
        <AtInput
          title="收货人电话"
          name="phone"
          type="phone"
          placeholder={"请输入收货人电话"}
          value={expressInfo.phone}
          onChange={value => onInputChange("phone", value)}
        />
        {/* </View> */}
        <View className="form-textarea">
          <View className="label">收货人地址</View>
          <AtTextarea
            placeholder={"请输入收货人地址"}
            value={expressInfo.address}
            onChange={value => onInputChange("address", value)}
          />
        </View>
        {/* <View> */}
        {/* <View className="label">货运部：</View> */}
        <AtInput
          title="货运部"
          name="express"
          type="text"
          placeholder={"请输入货运部名称"}
          value={expressInfo.express}
          onChange={value => onInputChange("express", value)}
        />
        {/* </View> */}
        {/* <View> */}
        {/* <View className="label">货运部电话：</View> */}
        <AtInput
          title="货运部电话"
          name="expressPhone"
          type="phone"
          placeholder={"请输入货运部电话"}
          value={expressInfo.expressPhone}
          onChange={value => onInputChange("expressPhone", value)}
        />
        {/* </View> */}
        <AtButton openType="share" type="primary">
          点我发送
        </AtButton>
      </View>
    </>
  );
};
const getText = (data: IMenuWithNum[] = [], sum: string = "0") => {
  let start = `へ订单信息へ\n`;
  let mid = "";
  let end = `共计：${sum} 元（不含运费）`;
  data.forEach(item => {
    if (item.number > 0) {
      mid += `${item.title}：${item.number}x${item.price} = ${(
        item.number * (item.price as number)
      ).toFixed(2)}\n`;
    }
  });

  let content = start + mid + end;
  return content;
};

export default Order;
