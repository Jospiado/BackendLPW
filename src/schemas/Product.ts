import {
  model, Schema, Document, Decimal128,
} from 'mongoose';
import { ProviderInterface } from './Provider';

export interface ProductInterface extends Document {
    name: string,
    link: string,
    provider: ProviderInterface,
    price: Decimal128,
    description: string,
    tipe: string,

}

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'nome obrigatório'],
  },
  link: {
    type: String,
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'Provider',
    required: [true, 'Fornecedor obrigatório'],
  },
  price: {
    type: Float32Array,
    required: [true, 'Preço obrigatório'],
  },
  description: {
    type: String,
  },
  tipe: {
    type: String,
    required: [true, 'Tipo obrigatório'],
  },
});

export default model<ProductInterface>('Task', ProductSchema);
