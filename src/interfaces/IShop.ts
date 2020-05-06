import { IAddressDto } from './IAddress';

export interface IShop {
  _id: string;
  name: string;
  registrationNumber: string;
  owner: string;
  address: string;
}

export interface IShopDto {
  name: string;
  registrationNumber: string;
  owner: string;
  address: IAddressDto[];
}
