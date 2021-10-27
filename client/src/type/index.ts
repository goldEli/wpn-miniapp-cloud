export interface IMenu {
  _id: string;
  index: number;
  price: number;
  unit: string;
  net?: number;
  netUnit?: string;
  title: string;
  imgSrc: string;
  onSale: boolean;
  total?: number;
}

export interface IFurnitureCategory {
  _id: string;
  name: string;
  index: number;
  seleted?: boolean; 
}

export interface IFurniture {
  _id?: string;
  /**
   * 图片地址
   */
  imgSrc?: string;
  /**
   * 排序
   */
  index?: number;
  /**
   * 是否销售
   */
  onSale?: boolean;
  /**
   * 价格
   */
  price?: number;
  /**
   * 标题
   */
  title?: string;
  /**
   * 数量
   */
  number?: number; 
  /**
   * 单位（袋）
   */
  unit?: string;
  /**
   * 120g
   */
  weight?: string
}

export interface IExpress {
  name: string;
  phone: string;
  address: string;
  express: string;
  expressPhone: string;
}

export interface IMaterial {
  name: string;
  active: boolean;
}

export interface IMenuListItem {
  category: IFurnitureCategory;
  funitureList: IFurniture[];
}
