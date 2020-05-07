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

  address: [
    {
      city: {
        type: String,
        require: [true, 'Please enter city'],
      },

      street: {
        type: String,
        require: [true, 'Please enter street'],
      },

      state: {
        type: String,
        require: [true, 'Please specify state'],
      },
    },
  ],
});

export default model<IShop & Document>('Shop', Shop);
