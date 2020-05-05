import { IUser } from './IUser';

export interface IShop {
  name: string;
  registrationNumber: string;
  owner: IUser;
}
