import React, { useEffect } from "react";
import Taro, {
  Config,
  getCurrentInstance,
  useShareAppMessage
} from "@tarojs/taro";
import { Button, View, Text } from "@tarojs/components";
import { AtList, AtListItem, AtInput, AtButton, AtTextarea } from "taro-ui";
import "./index.less";
import { IMenuWithNum } from "@/type";
import Title from "@/components/Title";

interface IOrderProps {}

type NameKey = "name" | "phone" | "address" | "express" | "expressPhone";

const Order: React.FC<IOrderProps> = props => {
  const [orderData, setOrderData] = React.useState<IMenuWithNum[]>([]);
  const [expressInfo, setExpressInfo] = React.useState({
    name: "",
    phone: "",
    address: "",
    express: "",
    expressPhone: ""
  });
  const fromHome = getCurrentInstance().router?.params?.fromHome as string;

  const sum = orderData.reduce((prev, item) => prev + (item.total || 0), 0);

  const editable = fromHome === "true";

  useShareAppMessage(res => {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    const text = getCurrentInstance().router?.params?.text || "";
    return {
      title: `订单(共计：￥${sum})`,
      path: `pages/order/index?text=${text}&expressInfo=${JSON.stringify(
        expressInfo
      )}`
    };
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

  useEffect(() => {
    if (editable) {
      for (const key in expressInfo) {
        Taro.getStorage({
          key,
          success: function(res) {
            console.log(res.data, key, "res");
            res.data &&
              setExpressInfo(prev => {
                return { ...prev, [key]: res.data };
              });
          }
        });
      }
    } else {
      const expressInfoStrFromUrl = getCurrentInstance().router?.params
        ?.expressInfo as string;
      const expressInfoFromUrl = JSON.parse(expressInfoStrFromUrl);
      for (const key in expressInfo) {
        setExpressInfo(prev => {
          return { ...prev, [key]: expressInfoFromUrl[key] };
        });
      }
    }
  }, [editable]);

  const onInputChange = (name: NameKey, value: any) => {
    console.log(name, value);
    Taro.setStorage({
      key: name,
      data: value
    });
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
        <AtInput
          editable={editable}
          title="收货人名称"
          name="name"
          type="text"
          placeholder={"请输入收货人名称"}
          value={expressInfo.name}
          onChange={value => onInputChange("name", value)}
        />
        <AtInput
          editable={editable}
          title="收货人电话"
          name="phone"
          type="phone"
          placeholder={"请输入收货人电话"}
          value={expressInfo.phone}
          onChange={value => onInputChange("phone", value)}
        />
        <View className="form-textarea">
          <View className="label">收货人地址</View>
          <AtTextarea
            disabled={!editable}
            placeholder={"请输入收货人地址"}
            value={expressInfo.address}
            onChange={value => onInputChange("address", value)}
          />
        </View>
        <AtInput
          editable={editable}
          title="货运部"
          name="express"
          type="text"
          placeholder={"请输入货运部名称"}
          value={expressInfo.express}
          onChange={value => onInputChange("express", value)}
        />
        <AtInput
          editable={editable}
          title="货运部电话"
          name="expressPhone"
          type="phone"
          placeholder={"请输入货运部电话"}
          value={expressInfo.expressPhone}
          onChange={value => onInputChange("expressPhone", value)}
        />
        <AtButton openType="share" type="primary">
          点我发送
        </AtButton>
      </View>
    </>
  );
};

Order.enableShareAppMessage = true;

export default Order;
