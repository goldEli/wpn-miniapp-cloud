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
}

export interface IFurnitureCategory {
  _id: string;
  name: string;
}

export interface IMenuWithNum extends Partial<IMenu> {
  number: number;
}
