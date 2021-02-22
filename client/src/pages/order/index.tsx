import React, { useEffect } from "react";
import Taro, {
  Config,
  getCurrentInstance,
  useShareAppMessage
} from "@tarojs/taro";
import { Button, View, Text } from "@tarojs/components";
import { AtList, AtListItem, AtInput, AtButton, AtTextarea } from "taro-ui";
import "./index.less";
import { IFurniture, IExpress } from "@/type";
import Title from "@/components/Title";
import ExpressArea from "./components/ExpressArea";
import ExpressAreaReadOnly from "./components/ExpressAreaReadOnly";
import _ from "lodash";
import SuccessPage from "./components/SuccessPage";

interface IOrderProps {}

const Order: React.FC<IOrderProps> = props => {
  const [orderData, setOrderData] = React.useState<IFurniture[]>([]);
  const [expressInfo, setExpressInfo] = React.useState<IExpress>({
    name: "",
    phone: "",
    address: "",
    express: "",
    expressPhone: ""
  });
  const [shared, setShared] = React.useState(false);
  const fromHome = getCurrentInstance().router?.params?.fromHome as string;

  const sum = React.useMemo(
    () => orderData.reduce((prev, item) => prev + (item.total || 0), 0),
    [orderData]
  );

  const editable = fromHome === "true";
  const disabledShare = React.useMemo(() => {
    return !Object.keys(expressInfo).every(key => !_.isEmpty(expressInfo[key]));
  }, [expressInfo]);

  useShareAppMessage(res => {
    const text = getCurrentInstance().router?.params?.text || "";
    setShared(true);
    return {
      title: `我的订单(共计：￥${sum})`,
      imageUrl:
        "https://wx3.sinaimg.cn/mw690/671cf50fgy1gnf9f0r6jvj20aa08bweo.jpg",
      path: `pages/order/index?text=${text}&expressInfo=${JSON.stringify(
        expressInfo
      )}`,
      onSuccess: () => {
        Taro.showToast({
          title: "订单发送成功",
          icon: "none",
          duration: 2000
        });
      }
    };
  });
  useEffect(() => {
    handleOrderData();
  }, []);

  useEffect(() => {
    if (editable) {
      setExpressInfoFromStorage();
    } else {
      setExpressInfoFromUrl();
    }
  }, [editable]);

  const checkValid = () => {
    if (_.isEmpty(expressInfo.name)) {
      Taro.showToast({
        title: "收货人未填",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (_.isEmpty(expressInfo.phone)) {
      Taro.showToast({
        title: "电话未填",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (_.isEmpty(expressInfo.address)) {
      Taro.showToast({
        title: "收货地址未填",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (_.isEmpty(expressInfo.express)) {
      Taro.showToast({
        title: "货运部未填",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (_.isEmpty(expressInfo.expressPhone)) {
      Taro.showToast({
        title: "货运部电话未填",
        icon: "none",
        duration: 2000
      });
      return;
    }
  };

  const handleOrderData = () => {
    const text = getCurrentInstance().router?.params?.text || "";
    const data: IFurniture[] = text ? JSON.parse(text) : [];
    setOrderData(
      data.map(item => {
        const total = parseFloat(
          ((item.number || 0) * (item.price || 0)).toFixed(2)
        );
        return {
          ...item,
          total: total
        };
      })
    );
  };

  const setExpressInfoFromStorage = () => {
    for (const key in expressInfo) {
      Taro.getStorage({
        key,
        success: function(res) {
          res.data &&
            setExpressInfo(prev => {
              return { ...prev, [key]: res.data };
            });
        }
      });
    }
  };
  const setExpressInfoFromUrl = () => {
    const expressInfoStrFromUrl = getCurrentInstance().router?.params
      ?.expressInfo as string;
    const expressInfoFromUrl = JSON.parse(expressInfoStrFromUrl);
    for (const key in expressInfo) {
      setExpressInfo(prev => {
        return { ...prev, [key]: expressInfoFromUrl[key] };
      });
    }
  };

  const onInputChange = (name: keyof IExpress, value: any) => {
    Taro.setStorage({
      key: name,
      data: value
    });
    setExpressInfo(prev => {
      return { ...prev, [name]: value };
    });
  };
  if (shared) {
    return <SuccessPage />;
  }
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
        {editable ? (
          <ExpressArea
            onInputChange={onInputChange}
            expressInfo={expressInfo}
          />
        ) : (
          <ExpressAreaReadOnly expressInfo={expressInfo} />
        )}
        {editable && (
          <view onClick={checkValid}>
            <AtButton disabled={disabledShare} openType="share" type="primary">
              点我发送
            </AtButton>
          </view>
        )}
      </View>
    </>
  );
};

Order.enableShareAppMessage = true;

export default Order;
