import { Schema, model, Document } from 'mongoose';
import { IShop } from '../interfaces/IShop';

const Shop = new Schema({
  name: {
    type: String,
    require: [true, 'Please you must enter shop name'],
  },

  registrationNumber: {
    type: String,
    require: [true, 'Please enter businesss registration number'],
    unique: true,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
export default model<IShop & Document>('Shop', Shop);
