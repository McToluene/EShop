import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { IShop } from '../../interfaces/IShop';
import { IAddress } from '../../interfaces/IAddress';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type ShopModel = Model<IShop & Document>;
    export type AddressModel = Model<IAddress & Document>;
  }
}
