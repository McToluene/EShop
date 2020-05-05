import { IUser } from './IUser';

export interface IShop {
  name: string;
  registrationNumber: string;
  owner: IUser;
}

export interface IShopDto {
  name: string;
  registrationNumber: string;
  owner: string;
}
