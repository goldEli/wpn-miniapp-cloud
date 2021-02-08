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
    this.handleScroll();
  }
  componentDidMount() {
    this.handleScroll();
  }
  componentWillUnmount() {
    this.distory();
  }

  distory() {
    clearTimeout(timer);
    this?.io?.disconnect();
  }

  handleScroll = () => {
    this.distory();
    Taro.nextTick(() => {
      // @ts-ignore
      this.io = Taro.createIntersectionObserver(this.current.page, {
        thresholds: [1],
        observeAll: true
      });
      this.io
        .relativeToViewport({ bottom: 0 })
        .observe(".class-" + this.props.id, res => {
          if (res.intersectionRatio !== 1) return;
          clearTimeout(timer);
          timer = setTimeout(() => {
            Taro.eventCenter.trigger(
              navActiveIdKey,
              res?.id.replace("the-", "")
            );
          }, 1000);
        });
    });
  };

  render() {
    return (
      <View>
        <View className={"class-" + this.props.id} id={"the-" + this.props.id}>
          <Text className="category-title">{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
