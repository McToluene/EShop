import { IAddress } from './IAddress';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
  salt: string;
  role: string;
  address: IAddress[];
}

export interface IUserRegisterDTO {
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface IUserUpdateDTO {
  name: string;
  email: string;
  password: string;
  type: UserType;
  address: IAddress[];
}

/*
 * Enum to determine the user type if it's of the three types
 * 1 for buyer
 * 2 for seller
 * 3 for logistics
 */
export enum UserType {
  buyer = 'buyer',
  seller = 'seller',
  logistics = 'logistics',
}
