import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtMessage } from 'taro-ui'
import './index.less'

interface ILoginProps { }

const Login: React.FC<ILoginProps> = (props) => {
  const [nameVal, setNameVal] = React.useState("")
  const [pwdVal, setPwdVal] = React.useState("")
  const onSubmit = e => {

    if (!nameVal) {
      Taro.atMessage({
        'message': '请输入账号',
        'type': "error",
      })
      return
    }
    if (!pwdVal) {
      Taro.atMessage({
        'message': '请输入密码',
        'type': "error",
      })
      return

    }
    console.log(e)
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
        const { result: res } = data
        if (res.isUser) {
          Taro.atMessage({
            'message': '登录成功',
            'type': "success",
          })
          Taro.redirectTo({
            url: '/pages/menuMngmt/menuMngmt',
          })
        } else {
          Taro.atMessage({
            'message': res.message,
            'type': "error",
          })

        }
      })
  }
  return (
    <View className="wme-login">
      <AtMessage />
      <AtInput
        name='name'
        title='账号'
        type='text'
        placeholder='输入账号'
        value={nameVal}
        onChange={(value) => { setNameVal(value as string) }}
      />
      <AtInput
        name='pwd'
        title='密码'
        type="password"
        placeholder='输入密码'
        value={pwdVal}
        onChange={(value) => { setPwdVal(value as string) }}
      />
      <AtButton type="primary" onClick={onSubmit}>登录</AtButton>
    </View>
  )
}

export default Login