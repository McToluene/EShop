import { Schema, model, Document } from 'mongoose';
import { IAddress } from '../interfaces/IAddress';

const AddressModel = new Schema({
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
});

export default model<IAddress & Document>('Address', AddressModel);
