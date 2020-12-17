export interface IMenu {
  _id: string,
  index: number,
  price: number,
  unit: string,
  net?: number,
  netUnit?: string,
  title: string,
  imgSrc: string,
  onSale: boolean,
}

export type IMenuWithNum = Partial<IMenu> & {number: number}