import { IShop } from './IShop';

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
  color: string;
  shop: IShop;
}

export interface IProductDto {
  name: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
  color: string;
  shop: String;
}
