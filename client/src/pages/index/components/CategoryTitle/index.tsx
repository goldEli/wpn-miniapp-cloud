import React from "react";
import Taro, { Config, getCurrentInstance, Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { navActiveIdKey } from "@/config/eventCenterKey";

interface ICategoryTitleProps {
  id?: string;
  name?: string;
}

let timer: any;

export default class CategoryTitle extends React.Component<
  ICategoryTitleProps
> {
  current = Taro.getCurrentInstance();
  io: Taro.IntersectionObserver;
  componentDidUpdate() {
    Taro.nextTick(() => {
      // console.log("didMount", this.current);
      // @ts-ignore
      this.io = Taro.createIntersectionObserver(this.current.page, {
        thresholds: [1],
        observeAll: true
      });
      // console.log('io 实例:', io);
      this.io
        .relativeToViewport({ bottom: 0 })
        .observe(".class-" + this.props.id, res => {
          console.log(this.props.name, res)
          if (res.intersectionRatio !== 1) return
          clearTimeout(timer);
          timer = setTimeout(() => {
            Taro.eventCenter.trigger(
              navActiveIdKey,
              res?.id.replace("the-", "")
            );
          }, 200);
        });
    });
  }
  componentWillUnmount() {
    clearTimeout(timer);
    this.io.disconnect();
  }

  render() {
    return (
      <View>
        <View className={"class-" + this.props.id} id={"the-" + this.props.id}>
          {this.props.name}
        </View>
      </View>
    );
  }
}
