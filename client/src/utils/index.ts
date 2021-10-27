import _ from "lodash";
export { default as http } from "./http";

export const isNumber = (value: any) => {
  if (_.isNumber(value) && !_.isNaN(value)) {
    return true;
  }
  return false;
};

export const handlePrice = {
  add: (x?: number, y?: number) => {
    if (!isNumber(x) || !isNumber(y)) return 0;
    //@ts-ignore
    return (x + y).toFixed(2);
  },
  sub: (x?: number, y?: number) => {
    if (!isNumber(x) || !isNumber(y)) return 0;
    //@ts-ignore
    return (x - y).toFixed(2);
  },
  mul: (x?: number, y?: number) => {
    if (!isNumber(x) || !isNumber(y)) return 0;
    //@ts-ignore
    return (x * y).toFixed(2);
  },
  div: (x?: number, y?: number) => {
    if (!isNumber(x) || !isNumber(y)) return 0;
    //@ts-ignore
    return (x / y).toFixed(2);
  },
  transfer: (x?: number) => {
    if (!isNumber(x)) return 0;
    return x?.toFixed(2);
  }
};
