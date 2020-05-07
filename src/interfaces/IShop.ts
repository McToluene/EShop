import { IAddressDto } from './IAddress';

export interface IShop {
  _id: string;
  name: string;
  registrationNumber: string;
  owner: string;
  address: [IAddressDto];
}

export interface IShopDTO {
  name: string;
  registrationNumber: string;
  owner: string;
  address: [IAddressDto];
}
