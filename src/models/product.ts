import { Schema, model, Document } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const Product = new Schema({
  name: {
    type: String,
    require: [true, 'Please provide a product name!'],
  },

  category: {
    type: String,
    require: [true, 'Please specify the product category'],
  },

  price: {
    type: Number,
    require: [true, 'Please give price to product'],
  },

  description: String,

  quantity: Number,

  color: String,

  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
  },
});
export default model<IProduct & Document>('Product', Product);
