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
}

export interface IMenuWithNum extends Partial<IMenu> {
  number: number;
}

export interface IFurniture {
  _id?: string;
  furnitureCategoryId?: string;
  imgSrc?: string;
  index?: number;
  note?: string;
  onSale?: boolean;
  price?: number;
  title?: string;
}
