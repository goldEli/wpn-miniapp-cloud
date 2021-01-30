import React from "react";
import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtButton, AtMessage, AtCheckbox } from "taro-ui";
import "./index.less";

interface ILoginProps {}
const options = [
  {
    value: "1",
    label: "记住我"
  }
];
const Login: React.FC<ILoginProps> = props => {
  const [nameVal, setNameVal] = React.useState("");
  const [pwdVal, setPwdVal] = React.useState("");
  const [selectedList, setSelectedList] = React.useState<string[]>([
    options[0].value
  ]);

  React.useEffect(() => {
    restoreFromStorage();
  }, []);

  const checkValid = () => {
    if (!nameVal) {
      Taro.atMessage({
        message: "请输入账号",
        type: "error"
      });
      return false;
    }
    if (!pwdVal) {
      Taro.atMessage({
        message: "请输入密码",
        type: "error"
      });
      return false;
    }
    return true;
  };

  const onSubmit = e => {
    if (!checkValid()) {
      return;
    }
    Taro.cloud
      .callFunction({
        name: "user",
        data: {
          action: "checkUser",
          name: nameVal,
          pwd: pwdVal
        }
      })
      .then((data: any) => {
        const { result: res } = data;
        if (res.isUser) {
          Taro.atMessage({
            message: "登录成功",
            type: "success"
          });
          Taro.redirectTo({
            url: "/pages/menuMngmt/menuMngmt"
          });
          saveToStorage();
        } else {
          Taro.atMessage({
            message: res.message,
            type: "error"
          });
        }
      });
  };
  const saveToStorage = () => {
    if (setSelectedList.length > 0) {
      Taro.setStorage({
        key: "nameVal",
        data: nameVal
      });
      Taro.setStorage({
        key: "pwdVal",
        data: pwdVal
      });
    } else {
      Taro.setStorage({
        key: "nameVal",
        data: ""
      });
      Taro.setStorage({
        key: "pwdVal",
        data: ""
      });
    }
  };
  const restoreFromStorage = () => {
    if (setSelectedList.length > 0) {
      Taro.getStorage({
        key: "nameVal",
        success: function(res) {
          res.data && setNameVal(res.data);
        }
      });
      Taro.getStorage({
        key: "pwdVal",
        success: function(res) {
          res.data && setPwdVal(res.data);
        }
      });
    }
  };
  const handleChange = (value: string[]) => {
    setSelectedList(value);
  };
  return (
    <View className="wme-login">
      <AtMessage />
      <AtInput
        name="name"
        title="账号"
        type="text"
        placeholder="输入账号"
        value={nameVal}
        onChange={value => {
          setNameVal(value as string);
        }}
      />
      <AtInput
        name="pwd"
        title="密码"
        type="password"
        placeholder="输入密码"
        value={pwdVal}
        onChange={value => {
          setPwdVal(value as string);
        }}
      />
      <AtCheckbox
        options={options}
        selectedList={selectedList}
        onChange={handleChange}
      />
      <AtButton type="primary" onClick={onSubmit}>
        登录
      </AtButton>
    </View>
  );
};

export default Login;
