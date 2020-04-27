export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
  salt: string;
  role: string;
}

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  type: UserType;
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
