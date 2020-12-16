import React from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Form, Text, Input, Label } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import "./index.scss"
import './index.less'

interface ILoginProps { }

const Login: React.FC<ILoginProps> = (props) => {
  const [nameVal, setNameVal] = React.useState("")
  const [pwdVal, setPwdVal] = React.useState("")
  const onSubmit = e => {

    console.log(nameVal, pwdVal)
    console.log(e)
  }
  return (
    <View className="wme-login">
      <AtInput
        name='name'
        title='账号'
        type='text'
        placeholder='输入账号'
        value={nameVal}
        onChange={(value) => { setNameVal(value) }}
      />
      <AtInput
        name='pwd'
        title='密码'
        type="password"
        placeholder='输入密码'
        value={pwdVal}
        onChange={(value) => { setPwdVal(value) }}
      />
      <AtButton type="primary" onClick={onSubmit}>登录</AtButton>
    </View>
  )
}

export default Login